import { httpResponse, httpRequest } from './http'

export interface Middlaware {
  handle: (httpRequest: httpRequest) => Promise<httpResponse>
}
