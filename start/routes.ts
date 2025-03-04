/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const TagsController = () => import('#controllers/tags_controller')
const NotesController = () => import('#controllers/notes_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
router
  .group(() => {
    router.post('/register', [AuthController, 'register']).as('auth.register')

    router.post('/login', [AuthController, 'login']).as('auth.login')

    router.post('/logout', [AuthController, 'logout']).as('auth.logout').use(middleware.auth())

    router.get('/me', [AuthController, 'me']).as('auth.me')
  })
  .prefix('/auth')

router
  .group(() => {
    router.get('/', [NotesController, 'index']).as('notes.index')
    router.get('/:id', [NotesController, 'show']).as('notes.show')
    router.post('/', [NotesController, 'store']).as('notes.store')
    router.put('/:id', [NotesController, 'update']).as('notes.update')
    router.delete('/:id', [NotesController, 'destroy']).as('notes.destroy')
  })
  .prefix('/notes')
  .use(middleware.auth())

router.post('/tags', [TagsController, 'store']).as('tags.store').use(middleware.auth())
router.get('/tags', [TagsController, 'userTags']).as('tags.index').use(middleware.auth())
router.delete('/tags/:id', [TagsController, 'destroy']).as('tags.destroy').use(middleware.auth())
