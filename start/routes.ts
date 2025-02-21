/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const LoginController = () => import('#controllers/auth/login_controller')
const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

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
