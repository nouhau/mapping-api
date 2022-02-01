import { Request, Response } from 'express'
import { LoggerService } from '../../common/LoggerService'
import { validateOrReject } from 'class-validator'
import { MatrixRequest } from '../dto/matrixRequest.dto'
import { CreateMatrixService } from '../services/createMatrix.service'

export class CreateMatrixController {
  private logger: LoggerService = new LoggerService()

  async handle (request: Request, response: Response): Promise<Response> {
    const matrixRequest: MatrixRequest = new MatrixRequest(request.body)
    const createMatrixService = new CreateMatrixService(request.body)

    return await validateOrReject(matrixRequest)
      .then(async () => {
        return await createMatrixService.execute()
          .then(matrix => {
            return response.status(200).json(matrix)
          })
          .catch(() => {
            throw new Error()
          })
      })
      .catch((error) => {
        let errorCode: string
        if (Array.isArray(error)) {
          error.forEach(item => {
            this.logger.trace(
              `No ${item.property} is provided `,
              'Request error'
            )
            errorCode = item.constraints[Object.keys(item.constraints)[0]]
          })
        }
        if (errorCode) {
          return response.status(400).json({ message: errorCode })
        }
        return response.status(500).json({ message: 'Error' })
      })
  }
}
