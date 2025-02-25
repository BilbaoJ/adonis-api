import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Note from './note.js'
import User from './user.js'

export default class Tag extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare name: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @manyToMany(() => Note, {
    pivotTable: 'note_tags',
  })
  declare notes: ManyToMany<typeof Note>
}
