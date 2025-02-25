import vine from '@vinejs/vine'

export const noteValidator = vine.compile(
  vine.object({
    title: vine.string().maxLength(255),
    content: vine.string().maxLength(255),
    tags: vine
      .array(
        vine.object({
          id: vine.number().isExists({ table: 'tags', column: 'id' }),
          name: vine.string(),
        })
      )
      .optional(),
  })
)
