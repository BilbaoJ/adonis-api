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

  async userTags({ auth, response }: HttpContext) {
    const userId = auth.user!.id
    const tags = await Tag.query().where('user_id', userId)
    return response.status(200).send({
      message: 'Tags read correctly',
      tags,
    })
  }

  async destroy({ auth, response, params }: HttpContext) {
    const userId = auth.user!.id
    const tag = await Tag.query().where('user_id', userId).andWhere('id', params.id).first()
    if (!tag) {
      return response.status(403).send({
        message: 'You are not able to do this action',
      })
    }
    await tag.delete()
    return response.status(200).send({
      message: 'Tag deleted correctly',
    })
  }
}
