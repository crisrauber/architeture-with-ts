import { badRequest } from '../../../helpers/http/http-helper'
import { Controller, httpResponse, httpRequest, Validation, AddSurvey } from './add-survey-controller-protocols'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {}

  async handle (httpRequest: httpRequest): Promise<httpResponse> {
    const error = this.validation.validate(httpRequest.body)

    if (error) {
      return badRequest(error)
    }

    const { question, answers } = httpRequest.body

    await this.addSurvey.add({
      question,
      answers
    })

    return null
  }
}
