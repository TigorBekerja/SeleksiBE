import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pivot from 'App/Models/Pivot' 
import Conversation from 'App/Models/Conversation'
export default class PivotsController {
    public async index({ response }: HttpContextContract) {
        try {
            // ambil seluruh pivots
            const pivots = await Pivot.query().preload('conversation').preload('message')
            return response.json(pivots)
        } catch (error) {
            return response.status(500).json({ error: 'Failed to fetch pivots' })
        }
    }
    public async store({ request, response }: HttpContextContract) {
        try {
            const dataPivot = request.only(['conversationId', 'messageId'])
            const pivot = await Pivot.create(dataPivot)
            await Conversation.findOrFail(request.input('conversationId')).then(async (conversation) => {
                // update lastMessageId pada conversation
                conversation.lastMessageId = request.input('messageId')
                await conversation.save()
            })
            return response.created(pivot)
        } catch (error) {
            return response.status(500).json({ error: 'Failed to create pivot' })
        }
    }
}
