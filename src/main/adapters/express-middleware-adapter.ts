import { httpRequest, Middlaware } from '../../presentation/protocols'
import { NextFunction, Request, Response } from 'express'

export const adaptMiddleware = (middleware: Middlaware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: httpRequest = {
      headers: req.headers
    }

    const httpResponse = await middleware.handle(httpRequest)

    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body)
      next()
    }

    res.status(httpResponse.statusCode).json({
      error: httpResponse.body.message
    })
  }
}
