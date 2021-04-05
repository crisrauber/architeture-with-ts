import { AddSurveyModel } from '../../../../domain/usecases/add-survey'

export interface AddSurveyRepository{
  add: (surveyDAta: AddSurveyModel) => Promise<void>

}
