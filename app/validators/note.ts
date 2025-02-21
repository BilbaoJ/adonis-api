import vine from '@vinejs/vine'

export const noteValidator = vine.compile(
  vine.object({
    title: vine.string().maxLength(255),
    content: vine.string().maxLength(255),
  })
)
