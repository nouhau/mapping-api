import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mapping } from '../../common/entities/Mapping';

@Injectable()
export class MappingService {

  constructor(
    private readonly logger: Logger = new Logger(MappingService.name),
    @InjectRepository(Mapping) private mappingRepository: Repository<Mapping>,
  ) {}

  getMapping = async (mappingId: string): Promise<Mapping> => {
    this.logger.log(
      `Getting mapping for ${mappingId}`
    )

    return this.mappingRepository.findOne({
      where: {
        mapping_id: mappingId
      }
    })
  }

  getMappingByPeopleId = async (peopleId: string): Promise<Mapping> => {
    this.logger.log(
      `Getting mapping for peopleId: ${peopleId}`
    )

    return this.mappingRepository.findOne({
      where: {
        people_id: peopleId
      }
    })
  }
}
