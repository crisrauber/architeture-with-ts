
import { Decrypter } from '../../protocols/cryptography/decrypter'
import { DbLoadAccountByToken } from './db-load-account-by-token'

const makeDecrypterStub = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return 'any_Value'
    }
  }

  return new DecrypterStub()
}

describe('DbLoadAccountByToken Usecase', () => {
  test('should call Decrypter with correct values', async () => {
    const decrypterStub = makeDecrypterStub()

    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')

    const sut = new DbLoadAccountByToken(decrypterStub)

    await sut.load('any_token')

    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })
})
