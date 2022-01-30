import { Request, Response } from 'express'
import { GetEvaluationMatrixService } from '../services/getEvaluationMatrix.service'

export class GetEvaluationMatrixController {
  async handle (request: Request, response: Response): Promise<Response> {
    const getEvaluationMatrixService = new GetEvaluationMatrixService()

    return await getEvaluationMatrixService.execute()
      .then(async matrix => {
        return response.status(200).json(matrix)
      })
      .catch(() => {
        return response.status(500).json({ message: 'Error' })
      })
  }
}
