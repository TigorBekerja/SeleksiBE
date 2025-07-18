import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Message from 'App/Models/Message'
import Conversation from 'App/Models/Conversation'
import Pivot from 'App/Models/Pivot'
import axios from 'axios'
import MessageValidator from 'App/Validators/MessageValidator'

export default class MessagesController {
    public async index({ response }: HttpContextContract) {
        try {
            // Fetch all messages
            const messages = await Message.query()
            return response.json(messages)
        } catch (error) {
            return response.status(500).json({ error: 'Failed to fetch messages' })
        }
    }
    public async store({ request, response }: HttpContextContract) {
        try {
            // Validate and create a new message
            const dataMsg = request.only(['senderType', 'message', 'additionalMessage'])
            await request.validate(MessageValidator)
            const message = await Message.create(dataMsg)

            const conversationId = request.input('conversationId')
            let conversation: Conversation

            if (conversationId) {
                // update lastMessageId jika ada conversationId
                conversation = await Conversation.findOrFail(conversationId)
                conversation.lastMessageId = message.id
                await conversation.save()
            }else{
                // buat baru conversation jika tidak ada conversationId
                const { v4: uuidv4 } = await import('uuid')
                conversation = await Conversation.create({
                    sessionId: uuidv4(),
                    lastMessageId: message.id,
                })
            }
            await Pivot.create({
                conversationId: conversation.id,
                messageId: message.id,
            })

            const botResponse = await axios.post('https://api.majadigidev.jatimprov.go.id/api/external/chatbot/send-message', {
                question: dataMsg.message,
                additional_context: dataMsg.additionalMessage || '',
                session_id: conversation.sessionId,
            })
            
            Message.create({
                senderType: 'bot',
                message: botResponse.data.data.message[0].text,
            }).then(async (botMessage) => {
                // update lastMessageId pada conversation
                conversation.lastMessageId = botMessage.id
                await conversation.save()
                await Pivot.create({
                    conversationId: conversation.id,
                    messageId: botMessage.id,
                })
            })
            const answer = botResponse.data.data.message[0].text || 'No response from bot'
            return response.created({answer})
        } catch (error) {
            return response.status(500).json({ error: error.messages})
        }
    }
    public async destroy({ params, response }: HttpContextContract) {
    try {
        const message = await Message.findOrFail(params.id)

        // Cek apakah message ini adalah lastMessage
        const conversation = await Conversation.query()
        .where('lastMessageId', message.id)
        .first()

        // Hapus message dulu
        await message.delete()

        // Update lastMessageId jika perlu
        if (conversation) {
            const lastMessage = await Pivot.query()
                .where('conversation_id', conversation.id)
                .orderBy('id', 'desc')
                .first()

            conversation.lastMessageId = lastMessage ? lastMessage.messageId : undefined
            await conversation.save()
        }

        return response.status(204).send(true)
        } catch (error) {
            console.error(error) // Tambahkan log ini untuk debug
            return response.status(404).json({ error: 'Message not found or update failed' })
        }
    }

}
