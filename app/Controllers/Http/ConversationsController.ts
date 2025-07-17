import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Conversation from 'App/Models/Conversation'
import Message from 'App/Models/Message'
import Pivot from 'App/Models/Pivot'

export default class ConversationsController {
    public async index({ response }: HttpContextContract) {
        try {
            // ambil seluruh conversations
            const conversations = await Conversation.query()
            return response.json(conversations)
        } catch (error) {
            return response.status(500).json({ error: 'Failed to fetch conversations' })
        }
    }
    public async store({ params, response }: HttpContextContract) {
        const { v4: uuidv4 } = await import('uuid')
        const conversation = await Conversation.create({
            sessionId: uuidv4(),
            lastMessageId: params.id || null, 
        })
        return response.created(conversation)
    }
    public async update({ params, request, response }: HttpContextContract) {
        try {
            const conversation = await Conversation.findOrFail(params.id)
            const data = request.only(['sessionId', 'lastMessageId'])
            conversation.merge(data)
            await conversation.save()
            return response.json(conversation)
        } catch (error) {
            return response.status(404).json({ error: 'Conversation not found' })
        }
    }
    public async destroy({ params, response }: HttpContextContract) {
        try {
            const conversation = await Conversation.findOrFail(params.id)
            // hapus seluruh message dengan pivot yang terkait
            const pivots = await Pivot.query().where('conversationId', conversation.id)
            for (const pivot of pivots) {
                const messages = await Message.query().where('id', pivot.messageId)
                for (const message of messages) {
                    await message.delete()
                }
                await pivot.delete()
            }
            await conversation.delete()
            return response.status(204).send(true)
        } catch (error) {
            return response.status(404).json({ error: 'Conversation not found' })
        }
    }
}
