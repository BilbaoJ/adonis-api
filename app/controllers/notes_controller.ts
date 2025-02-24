import Note from '#models/note'
import { noteValidator } from '#validators/note'
import type { HttpContext } from '@adonisjs/core/http'

export default class NotesController {
  /**
   * Display a list of resource
   */
  async index({ auth, response }: HttpContext) {
    try {
      const user = auth.user!
      const notes = await user.related('notes').query()
      return response.status(200).send({
        message: 'Notes read correctly',
        notes,
      })
    } catch (error) {}
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth }: HttpContext) {
    try {
      const data = await request.validateUsing(noteValidator)
      const user = auth.user!
      const userId = user.id
      const note = await Note.create({ userId, ...data })
      return response.status(201).send({
        message: 'Notes created correctly',
        note,
      })
    } catch (error) {
      return response.status(500).send({
        message: 'Something went wrong',
      })
    }
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
