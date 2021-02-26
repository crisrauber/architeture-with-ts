import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hash'))
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('should call bcrypt with correct values', async () => {
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    const sut = makeSut()
    await sut.encrypt('any_Value')

    expect(hashSpy).toHaveBeenCalledWith('any_Value', salt)
  })

  test('should return a hash on success ', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('any_Value')

    expect(hash).toBe('hash')
  })
})
