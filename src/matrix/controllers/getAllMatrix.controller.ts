import { Request, Response } from 'express'
import { GetAllMatrixService } from '../services/getAllMatrix.service'

export class GetAllMatrixController {
  async handle (request: Request, response: Response): Promise<Response> {
    const getAllMatrixService = new GetAllMatrixService()

    return await getAllMatrixService.execute()
      .then(async matrix => {
        return response.status(200).json(matrix)
      })
      .catch(() => {
        return response.status(500).json({ message: 'Error' })
      })
  }
}
