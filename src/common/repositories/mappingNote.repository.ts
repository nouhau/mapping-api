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
          skill_id: '83296910-b8eb-4d89-b90e-f215c8ad3d94'
        },
        {
          note: 1
        }
      )
    }
}
