import { Request, Response } from 'express'
import { CreateEvidenceService } from '../services/createEvidence.service'

export class CreateEvidenceController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { name, desc } = request.body

    const createEvidenceService = new CreateEvidenceService({ name, desc })

    return await createEvidenceService.execute()
      .then(async evidence => {
        return response.status(200).json(evidence)
      })
      .catch(() => {
        return response.status(500).json({ message: 'Error' })
      })
  }
}
