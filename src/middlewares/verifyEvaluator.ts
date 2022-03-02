import { Request, Response, NextFunction } from 'express'
import { userRole } from '../common/constants/userRole'
import { LoggerService } from '../common/LoggerService'

const logger = new LoggerService()

export function verifyEvaluator (request: Request, response: Response, next: NextFunction) {
  logger.trace(
    'Validating user',
    'verifyEvaluator'
  )

  if (request.body.auth.role === userRole.EVALUATOR || request.body.auth.role === userRole.ADMIN) {
    console.log(request.body.auth.role)
    return next()
  }

  return response.status(401).json({
    error: 'User not authorized'
  })
}
