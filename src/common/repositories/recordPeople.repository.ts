import { EntityManager, EntityRepository } from 'typeorm'
import { RecordPeople } from '../entities/RecordPeople'

@EntityRepository(RecordPeople)
export class RecordPeopleRepository {
    private manager: EntityManager;

    constructor (manager: EntityManager) {
      this.manager = manager
    }

    getRecord = async (peopleId: string): Promise<RecordPeople[]> => {
      return await this.manager.find(RecordPeople, {
        where: {
          people_id: peopleId
        },
        relations: ['evidenceId']
      })
    }

    updateRecord = async (peopleId: string, evidenceId: string, average: number) => {
      return await this.manager.update(RecordPeople,
        {
          // TODO: change to dinamic paramter
          people_id: peopleId,
          evidence_id: evidenceId
        },
        {
          average
        }
      )
    }
}
