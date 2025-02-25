import Note from '#models/note'
import Tag from '#models/tag'

export class NoteService {
  static async findNote(id: string, userId: number) {
    const note = await Note.query().where('id', id).andWhere('user_id', userId).firstOrFail()
    return note
  }

  static async verifyTags(tagIds: number[], userId: number) {
    const userTags = await Tag.query().whereIn('id', tagIds).where('user_id', userId)
    return userTags.length !== tagIds.length
  }
}
