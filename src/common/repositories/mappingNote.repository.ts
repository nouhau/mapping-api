import { EntityManager, EntityRepository, UpdateResult } from 'typeorm'
import { MappingNote } from '../entities/MappingNote'

@EntityRepository(MappingNote)
export class MappingNoteRepository {
    private manager: EntityManager;

    constructor (manager: EntityManager) {
      this.manager = manager
    }

    // TODO: change to dinamic paramter
    getMapping = async (): Promise<MappingNote[]> => {
      return await this.manager.find(MappingNote)
    }

    updateMappingNote = async (): Promise<UpdateResult> => {
      return await this.manager.update(MappingNote,
        {
          mapping_id: '',
          skill_id: ''
        },
        {
          note: 2
        }
      )
    }
}
