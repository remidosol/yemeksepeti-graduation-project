import { DateTime } from 'luxon'
import Order from 'App/Models/Order'
import Restaurant from 'App/Models/Restaurant'
import {
  BaseModel,
  column,
  manyToMany,
  ManyToMany,
  belongsTo,
  BelongsTo,
} from '@ioc:Adonis/Lucid/Orm'

/**
 *  @swagger
 *  components:
 *  schemas:
 *    Food:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        name:
 *          type: string
 *        price:
 *          type: number
 *          format: double
 *        description:
 *          type: string
 *      required:
 *        - name
 *        - price
 */
export default class Food extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: 'restaurantId' })
  public restaurantId: number

  @column({ serializeAs: 'name' })
  public name: string

  @column({ serializeAs: 'price' })
  public price: number

  @column({ serializeAs: 'imageUrl' })
  public imageUrl: string

  @column({ serializeAs: 'description' })
  public description: string | undefined | null

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @manyToMany(() => Order, {
    localKey: 'id',
    pivotForeignKey: 'food_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'order_id',
    pivotTable: 'pivot_order_foods',
    serializeAs: 'foodOrders',
  })
  public foodOrders: ManyToMany<typeof Order>

  @belongsTo(() => Restaurant, {
    foreignKey: 'restaurantId',
    serializeAs: 'restaurant',
  })
  public restaurant: BelongsTo<typeof Restaurant>
}
