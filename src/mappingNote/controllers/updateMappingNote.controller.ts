import { validateOrReject } from 'class-validator'
import { Request, Response } from 'express'
import { LoggerService } from '../../common/LoggerService'
import { MappingNoteRequest } from '../dto/mappingNoteRequest.dto'
import { UpdateMappingNoteService } from '../services/updateMappingNote.service'

export class UpdateMappingNoteController {
  async handle (request: Request, response: Response): Promise<Response> {
    const logger: LoggerService = new LoggerService()
    const mappingNoteRequest = new MappingNoteRequest(request.body)
    const updateMappingNoteService = new UpdateMappingNoteService()

    return await validateOrReject(mappingNoteRequest)
      .then(async () => {
        return await updateMappingNoteService.execute(mappingNoteRequest.mappingId)
          .then(result => {
            return response.status(200).json(result)
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
