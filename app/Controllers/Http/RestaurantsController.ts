import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Restaurant from 'App/Models/Restaurant'
import Food from 'App/Models/Food'
import S3 from '@ioc:Services/S3'

export default class RestaurantsController {
  /**
   *
   * Fetch all of Restaurants
   *
   * @param ctx
   */
  public async index({ request, response }: HttpContextContract) {
    try {
      let page = request.input('page')

      const restaurants = await Restaurant.query()
        // .preload('restaurantAddress')
        // .preload('restaurantFoods')
        .paginate(page, 10)

      const restaurantsJSON = JSON.parse(JSON.stringify(restaurants))

      for (let restaurant of restaurantsJSON.data) {
        if (!restaurant.logoUrl.startsWith('http')) {
          restaurant.logoUrl = 'http://' + restaurant.logoUrl
        }
      }

      return response.status(200).json({
        message: 'Restaurants have been fetched.',
        data: restaurantsJSON,
      })
    } catch (error) {
      console.warn(error.message)
      console.warn(error.stack)
      return response.status(500).json({
        message: 'Something went wrong.',
        error: error,
      })
    }
  }

  /**
   *
   * Find a Restaurant
   *
   * @param ctx
   */
  public async find({ response, params }: HttpContextContract) {
    try {
      const restaurantId = params.restaurant_id

      const restaurant = await Restaurant.findByOrFail('id', restaurantId)

      await restaurant.load('restaurantAddress')
      await restaurant.load('restaurantFoods')

      const restaurantJSON = restaurant.toJSON()

      if (!restaurantJSON.logoUrl.startsWith('http')) {
        restaurantJSON.logoUrl = 'http://' + restaurantJSON.logoUrl
      }

      for (let food of restaurantJSON.restaurantFoods) {
        if (!food.imageUrl.startsWith('http')) {
          food.imageUrl = 'http://' + food.imageUrl
        }
      }

      return response.status(200).json({
        message: 'Restaurant has been found.',
        data: restaurant.toJSON(),
      })
    } catch (error) {
      console.warn(error.message)
      console.warn(error.stack)
      return response.status(500).json({
        message: 'Something went wrong.',
        error: error,
      })
    }
  }

  /**
   *
   * Store a Restaurant
   *
   * @param ctx
   */
  public async store({ request, response }: HttpContextContract) {
    try {
      const receivedData = request.only([
        'name',
        'category',
        'description',
        'rating',
        'arrivalTime',
      ])

      const logoFile = request.file('logoUrl')

      const logoUrl = await S3.uploadToBucket(logoFile!, 'restaurants')

      const restaurant = await Restaurant.create({
        name: receivedData.name,
        category: receivedData.category,
        logoUrl: logoUrl?.url,
        description: receivedData.description,
        arrivalTime: receivedData.arrivalTime,
        rating: receivedData.rating,
      })

      await restaurant.save()
      await restaurant.refresh()

      const restaurantJSON = restaurant.toJSON()

      if (!restaurantJSON.logoUrl.startsWith('http')) {
        restaurantJSON.logoUrl = 'http://' + restaurantJSON.logoUrl
      }

      return response.status(200).json({
        message: 'Restaurant has been created.',
        data: restaurantJSON,
      })
    } catch (error) {
      console.warn(error.message)
      console.warn(error.stack)
      return response.status(500).json({
        message: 'Something went wrong.',
        error: error,
      })
    }
  }

  /**
   *
   * Store a Restaurant address.
   *
   * @param ctx
   */
  public async storeRestaurantAddress({ request, response, params }: HttpContextContract) {
    try {
      const restaurantId = params.restaurant_id
      const addressData = request.only([
        'country',
        'city',
        'district',
        'neighborhood',
        'street',
        'latitude',
        'longitude',
      ])

      const restaurant = await Restaurant.findByOrFail('id', restaurantId)

      await restaurant.related('restaurantAddress').create({
        ...addressData,
      })

      await restaurant.save()
      await restaurant.load('restaurantAddress')
      await restaurant.refresh()

      return response.status(200).json({
        message: 'Address has been added to restaurant.',
        data: restaurant.toJSON(),
      })
    } catch (error) {
      console.warn(error.message)
      console.warn(error.stack)
      return response.status(500).json({
        message: 'Something went wrong.',
        error: error,
      })
    }
  }

  /**
   *
   * Find a Food
   *
   * @param ctx
   */
  public async findFood({ response, params }: HttpContextContract) {
    try {
      const foodId = params.food_id

      const food = await Food.findByOrFail('id', foodId)

      const foodJSON = food.toJSON()

      if (!foodJSON.imageUrl.startsWith('http')) {
        foodJSON.imageUrl = 'http://' + foodJSON.imageUrl
      }

      return response.status(200).json({
        message: 'Food has been found.',
        data: foodJSON,
      })
    } catch (error) {
      console.warn(error.message)
      console.warn(error.stack)
      return response.status(500).json({
        message: 'Something went wrong.',
        error: error,
      })
    }
  }

  /**
   *
   * Add food to a restaurant.
   *
   * @param ctx
   */
  public async addFood({ request, response }: HttpContextContract) {
    try {
      const receivedData = request.only(['name', 'price', 'restaurantId'])

      const imageFile = request.file('imageUrl')

      const imageUrl = await S3.uploadToBucket(imageFile!, 'foods')

      const restaurant = await Restaurant.findByOrFail('id', receivedData.restaurantId)

      let food = await restaurant.related('restaurantFoods').create({
        name: receivedData.name,
        price: receivedData.price,
        imageUrl: imageUrl?.url,
      })

      // await restaurant.related('restaurantFoods').save()
      await restaurant.save()
      await restaurant.refresh()

      const foodJSON = food.toJSON()

      if (!foodJSON.imageUrl.startsWith('http')) {
        foodJSON.imageUrl = 'http://' + foodJSON.imageUrl
      }

      return response.status(200).json({
        message: 'Food has been created.',
        data: foodJSON,
      })
    } catch (error) {
      console.warn(error.message)
      console.warn(error.stack)
      return response.status(500).json({
        message: 'Something went wrong.',
        error: error,
      })
    }
  }

  /**
   *
   * Update food of restaurant.
   *
   * @param ctx
   */
  public async updateFood({ request, response, params }: HttpContextContract) {
    try {
      const foodId = params.food_id

      const receivedData = request.only(['name', 'price'])

      const food = await Food.findByOrFail('id', foodId)

      const imageFile = request.file('imageUrl')

      if (imageFile && !food.imageUrl.startsWith('http')) {
        await S3.deleteFromBucket('foods', food.imageUrl.split('/')[2])

        const imageUrl = await S3.uploadToBucket(imageFile!, 'foods')
        food.imageUrl = imageUrl?.url ? imageUrl?.url : food.imageUrl
      }

      food.name = receivedData.name ? receivedData.name : food.name
      food.price = receivedData.price ? receivedData.price : food.price

      await food.save()
      await food.refresh()

      return response.status(200).json({
        message: 'Food has been updated.',
        data: food.toJSON(),
      })
    } catch (error) {
      console.warn(error.message)
      console.warn(error.stack)
      return response.status(500).json({
        message: 'Something went wrong.',
        error: error,
      })
    }
  }

  /**
   *
   * Update a Restaurant
   *
   * @param ctx
   */
  public async update({ request, response, params }: HttpContextContract) {
    try {
      const restaurantId = params.restaurant_id

      const receivedData = request.only(['name', 'category', 'rating', 'arrivalTime'])

      const restaurant = await Restaurant.findByOrFail('id', restaurantId)

      const logoFile = request.file('logoUrl')
      if (logoFile && !restaurant.logoUrl.startsWith('http')) {
        await S3.deleteFromBucket('restaurants', restaurant.logoUrl.split('/')[2])
        const logoUrl = await S3.uploadToBucket(logoFile!, 'restaurants')
        restaurant.logoUrl = logoUrl?.url ? logoUrl.url : restaurant.logoUrl
      }

      restaurant.name = receivedData.name ? receivedData.name : restaurant.name
      restaurant.category = receivedData.category ? receivedData.category : restaurant.category

      restaurant.rating = receivedData.rating ? receivedData.rating : restaurant.rating
      restaurant.arrivalTime = receivedData.arrivalTime
        ? receivedData.arrivalTime
        : restaurant.arrivalTime

      await restaurant.save()
      await restaurant.refresh()

      return response.status(200).json({
        message: 'Restaurant has been updated.',
        data: restaurant.toJSON(),
      })
    } catch (error) {
      console.warn(error.message)
      console.warn(error.stack)
      return response.status(500).json({
        message: 'Something went wrong.',
        error: error,
      })
    }
  }

  /**
   *
   * Delete a Restaurant
   *
   * @param ctx
   */
  public async destroy({ response, params }: HttpContextContract) {
    try {
      const restaurantId = params.restaurant_id

      const restaurant = await Restaurant.findByOrFail('id', restaurantId)

      await restaurant.related('restaurantAddress').query().delete()
      await restaurant.related('restaurantFoods').query().delete()

      if (!restaurant.logoUrl.startsWith('http')) {
        await S3.deleteFromBucket('restaurants', restaurant.logoUrl.split('/')[2])
      }
      await restaurant.delete()

      return response.status(200).json({
        message: 'Restaurant has been deleted',
        data: {},
      })
    } catch (error) {
      console.warn(error.message)
      console.warn(error.stack)
      return response.status(500).json({
        message: 'Something went wrong.',
        error: error,
      })
    }
  }
}
