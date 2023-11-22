/**
 * Http Error to handler error response
 *
 * @class HttpError
 */
export class HttpError extends Error {
  name = 'HttpError'
  statusCode

  constructor (errorMessage, statusCode = 500) {
    super(errorMessage)
    this.statusCode = statusCode
  }
}
