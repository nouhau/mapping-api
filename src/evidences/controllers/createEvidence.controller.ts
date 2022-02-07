import { Request, Response } from 'express'
import { validateOrReject } from 'class-validator'
import { CreateEvidenceService } from '../services/createEvidence.service'
import { EvidenceRequest } from '../dto/evidenceRequest.dto'
import { LoggerService } from '../../common/LoggerService'

export class CreateEvidenceController {
  async handle (request: Request, response: Response): Promise<Response> {
    const logger: LoggerService = new LoggerService()
    const evidenceRequest: EvidenceRequest = new EvidenceRequest(request.body)
    const createEvidenceService = new CreateEvidenceService(request.body)

    return await validateOrReject(evidenceRequest)
      .then(async () => {
        return await createEvidenceService.execute()
          .then(evidence => {
            return response.status(200).json(evidence)
          })
          .catch(() => {
            throw new Error()
          })
      })
      .catch((error) => {
        let errorCode: string
        if (Array.isArray(error)) {
          error.forEach(item => {
            logger.trace(
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
