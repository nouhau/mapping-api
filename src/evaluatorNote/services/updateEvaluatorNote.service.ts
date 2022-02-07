import { getCustomRepository } from 'typeorm'
import { EvaluatorNote } from '../../common/entities/EvaluatorNote'
import { LoggerService } from '../../common/LoggerService'
import { EvaluatorNoteRepository } from '../../common/repositories/evaluatorNote.repository'
import { UpdateRecordPeopleService } from '../../recordPeople/services/updateRecordPeople.service'
import { GetEvaluatorNoteService } from './getEvaluatorNote.service'

interface IEvaluatorNoteService {
  evaluatorNoteRepository?: EvaluatorNoteRepository,
  note: number
  updateRecordPeopleService?: UpdateRecordPeopleService,
  evaluatorId: string,
  peopleId: string,
  evidenceId: string,
  getEvaluatorNoteService?: GetEvaluatorNoteService
}

export class UpdateEvaluatorNoteService {
    private evaluatorNoteRepository: EvaluatorNoteRepository
    private evaluatorNote: EvaluatorNote
    private logger: LoggerService = new LoggerService()
    private updateRecordPeopleService: UpdateRecordPeopleService
    private getEvaluatorNoteService: GetEvaluatorNoteService

    constructor ({
      evaluatorNoteRepository = getCustomRepository(EvaluatorNoteRepository),
      note,
      updateRecordPeopleService = new UpdateRecordPeopleService({ value: note }),
      evaluatorId,
      peopleId,
      evidenceId,
      getEvaluatorNoteService = new GetEvaluatorNoteService({ peopleId, evidenceId })
    }: IEvaluatorNoteService) {
      this.evaluatorNoteRepository = evaluatorNoteRepository
      this.updateRecordPeopleService = updateRecordPeopleService
      this.getEvaluatorNoteService = getEvaluatorNoteService
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
        .then(async evaluatorNote => {
          this.getEvaluatorNotes()
            .then(evaluatorNotes => {
              if (evaluatorNotes.length >= 2) {
                // TODO: calculate new value from average
                this.updateRecordPeople()
                return evaluatorNote
              }
            })
          return evaluatorNote
        })
    }

    private async updateRecordPeople () {
      this.logger.trace(
        'Updating record people average',
        this.constructor.name
      )
      return await this.updateRecordPeopleService.execute()
    }

    private async getEvaluatorNotes () {
      this.logger.trace(
        'Getting evaluator notes',
        this.constructor.name
      )
      return this.getEvaluatorNoteService.execute()
    }
}
