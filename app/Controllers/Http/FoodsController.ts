import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Food from 'App/Models/Food'

export default class FoodsController {
  /**
   *
   * Fetch all of Foods
   *
   * @param ctx
   */
  public async index({ request, response }: HttpContextContract) {
    try {
      let page = request.input('page')
      const foods = await Food.query().paginate(page, 10)

      const foodsJSON = JSON.parse(JSON.stringify(foods))

      for (let food of foodsJSON.data) {
        if (!food.imageUrl.startsWith('http://') || !food.imageUrl.startsWith('https://')) {
          food.imageUrl = 'http://' + food.imageUrl
        }
      }

      return response.status(200).json({
        message: 'Foods have been fetched.',
        data: foodsJSON,
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
