import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Message from './Message'

export default class Conversation extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public sessionId: string
  @column()
  public lastMessageId: number

  @belongsTo(() => Message, {
    foreignKey: 'lastMessageId',
  })
  public lastMessage: BelongsTo<typeof Message>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
