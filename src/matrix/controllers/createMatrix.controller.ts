import { Request, Response } from 'express'
import { CreateMatrixService } from '../services/createMatrix.service'

export class CreateMatrixController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { name, desc } = request.body

    const createMatrixService = new CreateMatrixService({ name, desc })

    return await createMatrixService.execute()
      .then(async matrix => {
        return response.status(200).json(matrix)
      })
      .catch(() => {
        return response.status(500).json({ message: 'Error' })
      })
  }
}
