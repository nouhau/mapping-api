import { EntityManager, EntityRepository } from 'typeorm'
import { RecordPeople } from '../entities/RecordPeople'

@EntityRepository(RecordPeople)
export class RecordPeopleRepository {
    private manager: EntityManager;

    constructor (manager: EntityManager) {
      this.manager = manager
    }

    getRecord = async (): Promise<RecordPeople[]> => {
      return await this.manager.find(RecordPeople, {
        where: {
          // TODO: change to dinamic paramter
          people_email: 'teste@email.com'
        },
        relations: ['evidenceId']
      })
    }
}
