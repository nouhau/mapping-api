import { getCustomRepository } from 'typeorm'
import { MappingNote } from '../../common/entities/MappingNote'
import { LoggerService } from '../../common/LoggerService'
import { MappingNoteRepository } from '../../common/repositories/mappingNote.repository'

export class GetMappingNoteService {
    private mappingNoteRepository: MappingNoteRepository
    private logger: LoggerService = new LoggerService()

    constructor (
      mappingNoteRepository: MappingNoteRepository = getCustomRepository(MappingNoteRepository)
    ) {
      this.mappingNoteRepository = mappingNoteRepository
    }

    async execute (): Promise<MappingNote[]> {
      this.logger.trace(
        'Updating note',
        this.constructor.name
      )
      return await this.mappingNoteRepository.getMapping()
    }
}
