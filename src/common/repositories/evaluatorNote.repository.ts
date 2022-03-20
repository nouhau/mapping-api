import { EntityManager, EntityRepository, UpdateResult } from 'typeorm'
import { EvaluatorNote } from '../entities/EvaluatorNote'

@EntityRepository(EvaluatorNote)
export class EvaluatorNoteRepository {
    private manager: EntityManager;

    constructor (manager: EntityManager) {
      this.manager = manager
    }

    updateEvaluatorNote = async (
      evaluatorId: string,
      evidenceId: string,
      peopleId: string,
      note: number
    ): Promise<UpdateResult> => {
      return await this.manager.update(EvaluatorNote,
        {
          evaluator_id: evaluatorId,
          evidence_id: evidenceId,
          people_id: peopleId
        },
        {
          note: note
        }
      )
    }

    getEvaluatorNote = async (evidenceId: string, peopleId: string): Promise<EvaluatorNote[]> => {
      return await this.manager.find(EvaluatorNote,
        {
          where: {
            evidence_id: evidenceId,
            people_id: peopleId
          },
          relations: ['evidenceId']
        })
    }

    getEvaluatoNoteByPeopleId = async (peopleId: string): Promise<EvaluatorNote[]> => {
      return await this.manager.find(EvaluatorNote,
        {
          where: {
            people_id: peopleId
          },
          relations: ['evidenceId']
        })
    }
}
