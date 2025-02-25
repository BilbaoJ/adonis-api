import Note from '#models/note'
import { NoteService } from '#services/note_service'
import { noteValidator } from '#validators/note'
import type { HttpContext } from '@adonisjs/core/http'

export default class NotesController {
  /**
   * Display a list of resource
   */
  async index({ auth, response }: HttpContext) {
    const user = auth.user!
    const notes = await user.related('notes').query().preload('tags')
    return response.status(200).send({
      message: 'Notes read correctly',
      notes,
    })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth }: HttpContext) {
    const { title, content, tags } = await request.validateUsing(noteValidator)
    const user = auth.user!
    const userId = user.id
    const note = await Note.create({ userId, title, content })

    if (tags && tags.length > 0) {
      const tagIds = tags.map((tag) => tag!.id)
      await note.related('tags').attach(tagIds)
    }
    await note.load('tags')
    return response.status(201).send({
      message: 'Note created correctly',
      note,
    })
  }

  /**
   * Show individual record
   */
  async show({ params, auth, response }: HttpContext) {
    const userId = auth.user!.id
    const note = await NoteService.findNote(params.id, userId)
    await note.load('tags')
    return response.status(200).send({
      message: 'Note read correctly',
      note,
    })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response, auth }: HttpContext) {
    const userId = auth.user!.id
    const note = await NoteService.findNote(params.id, userId)
    await note.load('tags')
    const data = await request.validateUsing(noteValidator)
    note.merge(request.only(['title', 'content']))
    await note.save()
    if (data.tags) {
      const tagIds = data.tags.map((tag) => tag.id)
      await note.related('tags').sync(tagIds)
    } else {
      await note.related('tags').detach()
    }
    await note.load('tags')
    return response.status(200).send({
      message: 'Note updated correctly',
      note,
    })
  }

  /**
   * Delete record
   */
  async destroy({ params, response, auth }: HttpContext) {
    const userId = auth.user!.id
    const note = await NoteService.findNote(params.id, userId)
    await note.delete()
    return response.status(200).send({
      message: 'Note deleted correctly',
    })
  }
}
