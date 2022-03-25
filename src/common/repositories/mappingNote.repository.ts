import { EntityManager, EntityRepository, UpdateResult } from 'typeorm'
import { MappingNote } from '../entities/MappingNote'

@EntityRepository(MappingNote)
export class MappingNoteRepository {
    private manager: EntityManager;

    constructor (manager: EntityManager) {
      this.manager = manager
    }

    getMapping = async (mappingId: string): Promise<MappingNote[]> => {
      return await this.manager.find(MappingNote, {
        where: {
          mapping_id: mappingId
        },
        relations: ['skillId']
      })
    }

    updateMappingNote = async (mappingId: string, skillId: string, note: number): Promise<UpdateResult> => {
      return await this.manager.update(MappingNote,
        {
          mapping_id: mappingId,
          skill_id: skillId
        },
        {
          note
        }
      )
    }
}
