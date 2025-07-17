import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Message from './Message'
import Conversation from './Conversation'

export default class Pivot extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public conversationId: number
  @column()
  public messageId: number

  @belongsTo(() => Conversation, {
    foreignKey: 'conversationId',
  })
  public conversation: BelongsTo<typeof Conversation>
  @belongsTo(() => Message, {
    foreignKey: 'messageId',
  })
  public message: BelongsTo<typeof Message>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
