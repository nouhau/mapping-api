import { EntityManager, EntityRepository } from 'typeorm'
import { Mapping } from '../entities/Mapping'

@EntityRepository(Mapping)
export class MappingRepository {
    private manager: EntityManager;

    constructor (manager: EntityManager) {
      this.manager = manager
    }

    getMapping = async (mappingId: string): Promise<Mapping> => {
      return await this.manager.findOne(Mapping, {
        mapping_id: mappingId
      })
    }
}
