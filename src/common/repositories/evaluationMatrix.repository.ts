import { EntityManager, EntityRepository } from 'typeorm'
import { EvaluationMatrix } from '../entities/EvaluationMatrix'

@EntityRepository(EvaluationMatrix)
export class EvaluationMatrixRepository {
    private manager: EntityManager;

    constructor (manager: EntityManager) {
      this.manager = manager
    }

    getMain = async (): Promise<EvaluationMatrix[]> => {
      return await this.manager.find(EvaluationMatrix, {
        where: {
          // TODO: change to dinamic paramter
          matrix_id: '192f8754-69ad-4e0d-b529-211e8aa53812'
        },
        relations: ['matrixId', 'evidenceId', 'skillId']
      })
    }
}
