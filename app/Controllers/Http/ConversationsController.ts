import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Conversation from 'App/Models/Conversation'

export default class ConversationsController {
    public async index({ response }: HttpContextContract) {
        const conversations = await Conversation.query().preload('messages')
        return response.json(conversations)
    }
    
    public async show({ params, response }: HttpContextContract) {
        const conversation = await Conversation.query()
        .where('id', params.id)
        .preload('messages')
        .firstOrFail()
        return response.json(conversation)
    }
    
    public async store({ request, response }: HttpContextContract) {
        const data = request.only(['sessionId', 'lastMessageId'])
        const conversation = await Conversation.create(data)
        return response.created(conversation)
    }
    
    public async update({ params, request, response }: HttpContextContract) {
        const conversation = await Conversation.findOrFail(params.id)
        conversation.merge(request.only(['sessionId', 'lastMessageId']))
        await conversation.save()
        return response.json(conversation)
    }
    
    public async destroy({ params, response }: HttpContextContract) {
        const conversation = await Conversation.findOrFail(params.id)
        await conversation.delete()
        return response.noContent()
    }
}
