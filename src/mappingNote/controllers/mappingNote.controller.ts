import { Request, Response } from 'express'
import { LoggerService } from '../../common/LoggerService'
import { GetMappingNoteService } from '../services/getMappingNote.service'
import { MappingService } from '../services/mapping.service'

export class MappingNoteController {
  async getMapping (request: Request, response: Response): Promise<Response> {
    const { peopleId } = request.params
    const logger: LoggerService = new LoggerService()
    const mappingService = new MappingService()
    const mappingNoteService = new GetMappingNoteService()

    // TODO REFACTOR AND REMOVE SERVICES
    return await mappingService.getMappingByPeopleId(peopleId)
      .then(async result => {
        const mappingNotes = await mappingNoteService.execute(result.mapping_id)
        return response.status(200).json({
          mapping: result,
          mappingNotes
        })
      })
      .catch((error) => {
        logger.error(
          'Unknow erro',
          'Request error',
          error
        )
        return response.status(500).json({ message: 'Error' })
      })
  }
}
