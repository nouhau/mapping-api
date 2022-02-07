import { getCustomRepository } from 'typeorm'
import { LoggerService } from '../../common/LoggerService'
import { EvaluatorNoteRepository } from '../../common/repositories/evaluatorNote.repository'

interface IEvaluatorNoteService {
  evaluatorNoteRepository?: EvaluatorNoteRepository,
  peopleId: string,
  evidenceId: string
}

export class GetEvaluatorNoteService {
    private evaluatorNoteRepository: EvaluatorNoteRepository
    private logger: LoggerService = new LoggerService()
    private peopleId: string
    private evidenceId: string

    constructor ({
      evaluatorNoteRepository = getCustomRepository(EvaluatorNoteRepository),
      peopleId,
      evidenceId
    }: IEvaluatorNoteService) {
      this.evaluatorNoteRepository = evaluatorNoteRepository
      this.peopleId = peopleId
      this.evidenceId = evidenceId
    }

    async execute () {
      this.logger.trace(
        'Updating note',
        this.constructor.name
      )
      return await this.evaluatorNoteRepository.getEvaluatorNote()
    }
}
