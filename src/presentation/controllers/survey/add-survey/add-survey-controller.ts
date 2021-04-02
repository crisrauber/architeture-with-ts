import { Controller, httpResponse, httpRequest, Validation } from './add-survey-controller-protocols'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: httpRequest): Promise<httpResponse> {
    this.validation.validate(httpRequest.body)
    return null
  }
}
