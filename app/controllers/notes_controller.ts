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
   * Handle form submission for the create action
   */
  async store({ request, response, auth }: HttpContext) {
    try {
      const data = await request.validateUsing(noteValidator)
      const user = auth.user!
      const userId = user.id
      const note = await Note.create({ userId, ...data })
      return response.status(201).send({
        message: 'Note created correctly',
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
  async show({ params, auth, response }: HttpContext) {
    try {
      const userId = auth.user!.id
      const note = await Note.query().where('id', params.id).andWhere('user_id', userId).first()
      if (!note) {
        return response.status(404).send({
          message: 'Note not found',
        })
      }
      return response.status(200).send({
        message: 'Note read correctly',
        note,
      })
    } catch (error) {
      return response.status(500).send({
        message: 'Something went wrong',
      })
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response, auth }: HttpContext) {
    try {
      const userId = auth.user!.id
      const note = await Note.query().where('id', params.id).andWhere('user_id', userId).first()
      if (!note) {
        return response.status(404).send({
          message: 'Note not found',
        })
      }
      const data = await request.validateUsing(noteValidator)
      note.merge(data)
      await note.save()
      return response.status(200).send({
        message: 'Note updated correctly',
        note,
      })
    } catch (error) {
      return response.status(500).send({
        message: 'Something went wrong',
      })
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, response, auth }: HttpContext) {
    try {
      const userId = auth.user!.id
      const note = await Note.query().where('id', params.id).andWhere('user_id', userId).first()
      if (!note) {
        return response.status(404).send({
          message: 'Note not found',
        })
      }
      await note.delete()
      return response.status(200).send({
        message: 'Note deleted correctly',
      })
    } catch (error) {
      return response.status(500).send({
        message: 'Something went wrong',
      })
    }
  }
}
