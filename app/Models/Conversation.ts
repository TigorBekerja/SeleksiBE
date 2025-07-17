import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Message from './Message'
import { HasMany } from '@ioc:Adonis/Lucid/Orm'

export default class Conversation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public sessionId: string

  @column()
  public lastMessageId: number | null

  @hasMany(() => Message, { foreignKey: 'conversationId' })
  public messages: HasMany<typeof Message>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
