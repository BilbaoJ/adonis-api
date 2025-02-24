import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: unknown, ctx: HttpContext) {
    switch ((error as any).name) {
      case 'E_ROW_NOT_FOUND':
        return ctx.response.status(404).json({
          status: 'error',
          message: 'Resource not found',
        })

      case 'E_VALIDATION_FAILURE':
        return ctx.response.status(422).json({
          status: 'error',
          message: 'Validation failed',
          errors: (error as any).messages,
        })

      case 'E_UNAUTHORIZED_ACCESS':
      case 'E_INVALID_AUTH_UID':
      case 'E_INVALID_AUTH_PASSWORD':
        return ctx.response.status(401).json({
          status: 'error',
          message: 'Unauthorized access',
        })

      case 'E_FORBIDDEN_ACCESS':
        return ctx.response.status(403).json({
          status: 'error',
          message: 'You do not have permission to access this resource',
        })

      default:
        return super.handle(error, ctx)
    }
  }

  /**
   * The method is used to report error to the logging service or
   * the third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
