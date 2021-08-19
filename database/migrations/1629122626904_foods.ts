import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Foods extends BaseSchema {
  protected tableName = 'foods'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('restaurantId').notNullable()
      table.string('name').notNullable()
      table.double('price').notNullable()
      table.string('image_url').notNullable()
      table.string('description').nullable().defaultTo(null)
      table.dateTime('updated_at').nullable()
      table.dateTime('created_at').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
