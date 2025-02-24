import Note from '#models/note'

export class NoteService {
  static async findNote(id: string, userId: number) {
    const note = await Note.query().where('id', id).andWhere('user_id', userId).firstOrFail()
    return note
  }
}
