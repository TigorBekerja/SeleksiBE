import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MessageValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string([ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string([
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    message: schema.string({ trim: true }, [
      rules.minLength(1),
      rules.maxLength(1000),
    ]),
    senderType: schema.enum(['user', 'bot']),
    additionalMessage: schema.string.optional({ trim: true }, [
      rules.maxLength(2000),
    ]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'message.required': 'Message is required',
    'message.minLength': 'Message must be at least 1 character long',
    'message.maxLength': 'Message cannot exceed 1000 characters',
    'senderType.required': 'Sender type is required',
    'senderType.enum': 'Sender type must be either "user" or "bot"',
    'additionalMessage.maxLength': 'Additional message cannot exceed 2000 characters',
  }
}
