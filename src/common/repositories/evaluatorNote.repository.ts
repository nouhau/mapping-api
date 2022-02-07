import { EntityManager, EntityRepository, UpdateResult } from 'typeorm'
import { EvaluatorNote } from '../entities/EvaluatorNote'

@EntityRepository(EvaluatorNote)
export class EvaluatorNoteRepository {
    private manager: EntityManager;

    constructor (manager: EntityManager) {
      this.manager = manager
    }

    updateEvaluatorNote = async (): Promise<UpdateResult> => {
      return await this.manager.update(EvaluatorNote,
        {
          // TODO: change to dinamic paramter
          evaluator_id: '9debe0f7-72d2-4dd9-8601-bbc432041021',
          evidence_id: '0f7c9e57-64ba-4cfb-ac4e-98ba84dd34f7',
          people_id: '4914786a-c981-462b-a2dd-cc7157767b12'
        },
        {
          note: 6
        }
      )
    }

    getEvaluatorNote = async (): Promise<EvaluatorNote[]> => {
      // TODO: change to dinamic paramters
      return await this.manager.find(EvaluatorNote,
        {
          where: {
            evidence_id: '9debe0f7-72d2-4dd9-8601-bbc432041021',
            people_id: '4914786a-c981-462b-a2dd-cc7157767b12'
          },
          relations: ['evidenceId']
        })
    }
}
