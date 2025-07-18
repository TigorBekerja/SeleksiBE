import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Message from './Message'
import Pivot from './Pivot'
export default class Conversation extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public sessionId: string
  @column()
  public lastMessageId?: number

  @belongsTo(() => Message, {
    foreignKey: 'lastMessageId',
  })
  public lastMessage: BelongsTo<typeof Message>

  @hasMany(() => Pivot)
  public pivots: HasMany<typeof Pivot>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
