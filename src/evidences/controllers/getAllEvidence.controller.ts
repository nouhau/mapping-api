import { Request, Response } from 'express'
import { GetAllEvidenceService } from '../services/getAllEvidence.service'

export class GetAllEvidenceController {
  async handle (request: Request, response: Response): Promise<Response> {
    const getAllEvidenceService = new GetAllEvidenceService()

    return await getAllEvidenceService.execute()
      .then(async evidences => {
        return response.status(200).json(evidences)
      })
      .catch(() => {
        return response.status(500).json({ message: 'Error' })
      })
  }
}
