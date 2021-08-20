import { DateTime } from 'luxon'
import Food from 'App/Models/Food'
import Address from 'App/Models/Address'
import {
  BaseModel,
  column,
  manyToMany,
  ManyToMany,
  hasMany,
  HasMany,
  // afterFind,
} from '@ioc:Adonis/Lucid/Orm'

/**
 *  @swagger
 *  components:
 *  schemas:
 *    Restaurant:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        name:
 *          type: string
 *        category:
 *          type: string
 *        description:
 *          type: string
 *        rating:
 *          type: number
 *        arrivalTime:
 *          type: number
 *      required:
 *        - name
 *
 */
export default class Restaurant extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: 'name' })
  public name: string

  @column({ serializeAs: 'category' })
  public category: string

  @column({ serializeAs: 'rating' })
  public rating: number

  @column({ serializeAs: 'arrivalTime' })
  public arrivalTime: number

  @column({ serializeAs: 'logoUrl' })
  public logoUrl: string

  @column({ serializeAs: 'description' })
  public description: string | undefined | null

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @hasMany(() => Food, {
    serializeAs: 'restaurantFoods',
  })
  public restaurantFoods: HasMany<typeof Food>

  @manyToMany(() => Address, {
    localKey: 'id',
    pivotForeignKey: 'restaurant_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'address_id',
    pivotTable: 'pivot_restaurant_addresses',
    serializeAs: 'restaurantAddress',
  })
  public restaurantAddress: ManyToMany<typeof Address>

  // @afterFind()
  // public static async preloadRestaurantSingle(restaurant: Restaurant) {
  //   try {
  //     await restaurant.load('restaurantAddress')
  //     await restaurant.load('restaurantFoods')
  //   } catch (err) {
  //     console.warn(err.code)
  //     console.warn(err.message)
  //     console.warn(err.stack)
  //   }
  // }

  // @afterFetch()
  // public static async preloadRestaurantMultiple(restaurants: Restaurant[]) {
  //   try {
  //     for (let restaurant of restaurants) {
  //       await restaurant.load('restaurantAddress')
  //       await restaurant.load('restaurantFoods')
  //     }
  //   } catch (err) {
  //     console.warn(err.code)
  //     console.warn(err.message)
  //     console.warn(err.stack)
  //   }
  // }
}
