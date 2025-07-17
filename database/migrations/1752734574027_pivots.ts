import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Pivots extends BaseSchema {
  protected tableName = 'pivots'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')  
      table.integer('conversation_id').unsigned().notNullable().references('id').inTable('conversations').onDelete('CASCADE')
      table.integer('message_id').unsigned().notNullable().references('id').inTable('messages').onDelete('CASCADE')
      
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
