import { getCustomRepository } from 'typeorm'
import { EvaluatorNote } from '../../common/entities/EvaluatorNote'
import { LoggerService } from '../../common/LoggerService'
import { EvaluatorNoteRepository } from '../../common/repositories/evaluatorNote.repository'
import { UpdateRecordPeopleService } from '../../recordPeople/services/updateRecordPeople.service'

interface IEvaluatorNoteService {
  evaluatorNoteRepository?: EvaluatorNoteRepository,
  note: number
  updateRecordPeopleService?: UpdateRecordPeopleService,
  evaluatorId: string,
  peopleId: string,
  evidenceId: string
}

export class UpdateEvaluatorNoteService {
    private evaluatorNoteRepository: EvaluatorNoteRepository
    private evaluatorNote: EvaluatorNote
    private logger: LoggerService = new LoggerService()
    private updateRecordPeopleService: UpdateRecordPeopleService

    constructor ({
      evaluatorNoteRepository = getCustomRepository(EvaluatorNoteRepository),
      note,
      updateRecordPeopleService = new UpdateRecordPeopleService({ value: note }),
      evaluatorId,
      peopleId,
      evidenceId
    }: IEvaluatorNoteService) {
      this.evaluatorNoteRepository = evaluatorNoteRepository
      this.evaluatorNote = new EvaluatorNote(
        evaluatorId,
        peopleId,
        evidenceId,
        note
      )
      this.updateRecordPeopleService = updateRecordPeopleService
    }

    async execute () {
      this.logger.trace(
        'Updating note',
        this.constructor.name
      )
      return await this.evaluatorNoteRepository.updateEvaluatorNote()
        .then(async evaluatorNote => {
          this.updateRecordPeople()
          return evaluatorNote
        })
    }

    private async updateRecordPeople () {
      return await this.updateRecordPeopleService.execute()
    }
}
