import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ChangeLastMessages extends BaseSchema {
  protected tableName = 'conversations'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .foreign('last_message_id')
        .references('id')
        .inTable('messages')
        .onDelete('SET NULL')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('last_message_id')
    })
  }
}
