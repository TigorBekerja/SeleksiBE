import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Conversation from './Conversation'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public conversationId: number

  @column()
  public senderType: string

  @column()
  public message: string

  @column()
  public additionalMessage: string | null

  @belongsTo(() => Conversation, { foreignKey: 'conversationId' })
  public conversation: BelongsTo<typeof Conversation>
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
