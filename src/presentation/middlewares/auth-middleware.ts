import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers/http/http-helper'
import { Middlaware, httpRequest, httpResponse } from '../protocols'

export class AuthMiddleware implements Middlaware {
  async handle (httpRequest: httpRequest): Promise<httpResponse> {
    return forbidden(new AccessDeniedError())
  }
}
