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
      getEvaluatorNoteService = new GetEvaluatorNoteService()
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

    async execute (
      evaluatorId: string,
      evidenceId: string,
      peopleId: string,
      note: number
    ) {
      this.logger.trace(
        'Updating note',
        this.constructor.name
      )
      return await this.evaluatorNoteRepository.updateEvaluatorNote(
        evaluatorId,
        evidenceId,
        peopleId,
        note
      )
        .then(async evaluatorNote => {
          this.getEvaluatorNotes(evidenceId, peopleId)
            .then(evaluatorNotes => {
              const average = this.calulateAverage(evaluatorNotes)
              if (average) {
                this.updateRecordPeople(peopleId, evidenceId, average)
                return evaluatorNote
              }
            })
          return evaluatorNote
        })
    }

    private async updateRecordPeople (
      peopleId: string,
      evidenceId: string,
      average: number
    ) {
      this.logger.trace(
        'Updating record people average',
        this.constructor.name
      )
      return await this.updateRecordPeopleService.execute(peopleId, evidenceId, average)
    }

    private async getEvaluatorNotes (evidenceId: string, peopleId: string) {
      this.logger.trace(
        'Getting evaluator notes',
        this.constructor.name
      )
      return this.getEvaluatorNoteService.execute(evidenceId, peopleId)
    }

    private calulateAverage (evaluatorNotes: EvaluatorNote[]) {
      if (evaluatorNotes.length >= 2) {
        this.logger.trace(
          'Calculate new average',
          this.constructor.name
        )

        let note: number = 0
        evaluatorNotes.forEach(evaluatorNote => {
          note += evaluatorNote.note
          return note
        })
        note = note / evaluatorNotes.length
        return note
      }
    }
}
