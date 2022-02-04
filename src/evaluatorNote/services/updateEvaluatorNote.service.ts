import { getCustomRepository } from 'typeorm'
import { EvaluatorNote } from '../../common/entities/EvaluatorNote'
import { LoggerService } from '../../common/LoggerService'
import { EvaluatorNoteRepository } from '../../common/repositories/evaluatorNote.repository'

interface IEvaluatorNoteService {
  evaluatorNoteRepository?: EvaluatorNoteRepository
  evaluatorId: string,
  peopleId: string,
  evidenceId: string,
  note: number
}

export class UpdateEvaluatorNoteService {
    private evaluatorNoteRepository: EvaluatorNoteRepository
    private evaluatorNote: EvaluatorNote
    private logger: LoggerService = new LoggerService()

    constructor ({
      evaluatorNoteRepository = getCustomRepository(EvaluatorNoteRepository),
      evaluatorId,
      peopleId,
      evidenceId,
      note
    }: IEvaluatorNoteService) {
      this.evaluatorNoteRepository = evaluatorNoteRepository
      this.evaluatorNote = new EvaluatorNote(
        evaluatorId,
        peopleId,
        evidenceId,
        note
      )
    }

    async execute () {
      this.logger.trace(
        'Updating note',
        this.constructor.name
      )
      return await this.evaluatorNoteRepository.updateEvaluatorNote()
    }
}
