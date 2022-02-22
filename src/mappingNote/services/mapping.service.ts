import { getCustomRepository } from 'typeorm'
import { Mapping } from '../../common/entities/Mapping'
import { LoggerService } from '../../common/LoggerService'
import { MappingRepository } from '../../common/repositories/mapping.repository'

export class MappingService {
  private mappingRepository: MappingRepository
  private logger: LoggerService = new LoggerService()

  constructor (
    mappingRepository: MappingRepository = getCustomRepository(MappingRepository)
  ) {
    this.mappingRepository = mappingRepository
  }

  async getMapping (mappingId: string): Promise<Mapping> {
    this.logger.trace(
      'Geting mapping',
      this.constructor.name
    )

    return await this.mappingRepository.getMapping(mappingId)
  }
}
