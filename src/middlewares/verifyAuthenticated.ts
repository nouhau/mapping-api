import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { LoggerService } from '../common/LoggerService'

const logger = new LoggerService()

interface IPayload {
    sub: string;
}

export function verifyAuthenticated (request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization

  if (authToken) {
    const [, token] = authToken.split(' ')

    try {
      // TODO: change token
      const { sub } = verify(token, 'token') as IPayload
      logger.trace(
        'Validating token',
        'verifyAuthenticated'
      )

      request.userId = sub
      return next()
    } catch (error) {
      logger.error(
        'Invalid token',
        'verifyAuthenticated',
        error
      )

      return response.status(401).json({
        message: 'User not authorized'
      })
    }
  }

  return response.status(401).json({
    error: 'User not authorized'
  })
}