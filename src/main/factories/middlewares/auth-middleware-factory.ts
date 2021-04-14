import { AuthMiddleware } from '../../../presentation/middlewares/auth-middleware'
import { Middlaware } from '../../../presentation/protocols'
import { makeDbLoadAccountByToken } from '../usecases/account/load-account-by-token/db-load-account-by-token-factory'

export const makeAuthMiddleware = (role?: string): Middlaware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role)
}
