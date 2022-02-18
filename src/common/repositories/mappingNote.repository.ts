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
          mapping_id: '4f4daded-59ee-4051-8e90-635dae55fe78',
          skill_id: '0a94d8b6-a7ce-4ae6-bcd1-1f6d5223a3cd'
        },
        {
          note: 2
        }
      )
    }
}
