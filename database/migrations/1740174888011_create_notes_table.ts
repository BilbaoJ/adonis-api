import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'notes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('user.id').notNullable().onDelete('CASCADE')
      table.string('title', 255).notNullable()
      table.string('content', 255).notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.unique(['user_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
