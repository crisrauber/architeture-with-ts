import { MissingParamError } from '../../errors'
import { Validation } from './validation'
import { ValidationComposite } from './validation-composite'

describe('Validation Composite', () => {
  test('should return an error if any validation fails', () => {
    class ValidationStub implements Validation {
      validate (input: any): Error {
        return new MissingParamError('field')
      }
    }

    const validaationStub = new ValidationStub()
    const sut = new ValidationComposite([validaationStub])
    const error = sut.validate({ field: 'any_Value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
