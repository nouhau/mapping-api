import { EntityManager, EntityRepository } from 'typeorm'
import { Evidence } from '../entities/Evidences'

@EntityRepository(Evidence)
export class EvidenceRepository {
    private manager: EntityManager;

    constructor (manager: EntityManager) {
      this.manager = manager
    }

    getAll = async (): Promise<Evidence[]> => {
      return await this.manager.find(Evidence)
    }

    save = async (evidence: Evidence): Promise<Evidence> => {
      return await this.manager.save(evidence)
    }
}
