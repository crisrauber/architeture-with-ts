import { Controller, httpRequest, httpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

describe('LogControllerDecorator', () => {
  test('should call controller handle',async () => {
    class ControllerStub implements Controller {
      async handle (httpRequest: httpRequest): Promise<httpResponse> {
        const httpResponse: httpResponse = {
          statusCode: 200,
          body: {
            name: 'rodrigo'
          }
        }
        return new Promise(resolve => resolve(httpResponse))
      }
    }
    const controllerStub = new ControllerStub()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const sut = new LogControllerDecorator(controllerStub)

    const httpRequest = {
      body: {
        name: 'any_mail@mail.com',
        email: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
