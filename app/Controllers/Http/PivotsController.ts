import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pivot from 'App/Models/Pivot' 

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
            return response.created(pivot)
        } catch (error) {
            return response.status(500).json({ error: 'Failed to create pivot' })
        }
    }
    public async destroy({ params, response }: HttpContextContract) {
        try {
            const pivot = await Pivot.findOrFail(params.id)
            await pivot.delete()
            return response.status(204).send(true)
        } catch (error) {
            return response.status(500).json({ error: 'Failed to delete pivot' })
        }
    }
}
