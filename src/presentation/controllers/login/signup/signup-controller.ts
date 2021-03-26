import { httpResponse, httpRequest, Controller, AddAccount, Validation, Authentication } from './signup-controller-protocols'
import { badRequest, serverError, ok, forbidden } from '../../../helpers/http/http-helper'
import { EmailInUseError } from '../../../errors'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentiation: Authentication
  ) {}

  async handle (httpRequest: httpRequest): Promise<httpResponse> {
    try {
      const { name, email, password } = httpRequest.body

      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }
     
      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      if(!account){
        return forbidden(new EmailInUseError())
      }

      const accessToken = await this.authentiation.auth({
        email,
        password,
      })
      
    
      return ok({accessToken})
    } catch (error) {
      return serverError(error)
    }
  }
}
