import { getCustomRepository } from 'typeorm'
import { LoggerService } from '../../common/LoggerService'
import { EvaluatorNoteRepository } from '../../common/repositories/evaluatorNote.repository'

export class GetEvaluatorNoteService {
    private evaluatorNoteRepository: EvaluatorNoteRepository
    private logger: LoggerService = new LoggerService()

    constructor (
      evaluatorNoteRepository: EvaluatorNoteRepository = getCustomRepository(EvaluatorNoteRepository)
    ) {
      this.evaluatorNoteRepository = evaluatorNoteRepository
    }

    async execute (evidenceId: string, peopleId: string) {
      this.logger.trace(
        'Updating note',
        this.constructor.name
      )
      return await this.evaluatorNoteRepository.getEvaluatorNote(evidenceId, peopleId)
    }
}
