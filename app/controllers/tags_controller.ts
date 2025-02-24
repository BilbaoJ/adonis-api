import Tag from '#models/tag'
import type { HttpContext } from '@adonisjs/core/http'

export default class TagsController {
  async store({ request, response, auth }: HttpContext) {
    const { name } = request.only(['name'])
    const user = auth.user!
    const userId = user.id
    const tag = await Tag.create({ userId, name })
    return response.status(201).send({
      message: 'Tag created correctly',
      tag,
    })
  }

  async UserTags({ auth, response }: HttpContext) {
    const userId = auth.user!.id
    const tags = await Tag.query().where('user_id', userId)
    return response.status(200).send({
      message: 'Tags read correctly',
      tags,
    })
  }
}
