import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hash'))
  }
  
  async compare (): Promise<boolean> {
    return new Promise(resolve => resolve(true))
  }

}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('should call hash with correct values', async () => {
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    const sut = makeSut()
    await sut.hash('any_Value')

    expect(hashSpy).toHaveBeenCalledWith('any_Value', salt)
  })

  test('should return a valid hash on hash success', async () => {
    const sut = makeSut()
    const hash = await sut.hash('any_Value')

    expect(hash).toBe('hash')
  })

  test('should throw if hash throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.hash('any_Value')

    await expect(promise).rejects.toThrow()
  })

  test('should call compare with correct values', async () => {
    const CompareSpy = jest.spyOn(bcrypt, 'compare')
    const sut = makeSut()
    await sut.compare('any_Value', 'any_hash')

    expect(CompareSpy).toHaveBeenCalledWith('any_Value', 'any_hash')
  })

  test('should return true when compare succeeds', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('any_Value', 'any_hash')

    expect(isValid).toBe(true)
  })

  test('should return false when compare fails', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(new Promise((resolve) => resolve(false)))
    
    const isValid = await sut.compare('any_Value', 'any_hash')

    expect(isValid).toBe(false)
  })

  test('should throw if compare throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.compare('any_Value', 'any_hash')

    await expect(promise).rejects.toThrow()
  })
})
