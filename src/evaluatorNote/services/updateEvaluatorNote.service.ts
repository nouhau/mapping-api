import { getCustomRepository } from 'typeorm'
import { EvaluatorNote } from '../../common/entities/EvaluatorNote'
import { LoggerService } from '../../common/LoggerService'
import { EvaluatorNoteRepository } from '../../common/repositories/evaluatorNote.repository'
import { UpdateRecordPeopleService } from '../../recordPeople/services/updateRecordPeople.service'
import { EvaluatorNoteService } from './evaluatorNote.service'

interface IEvaluatorNoteService {
  evaluatorNoteRepository?: EvaluatorNoteRepository
  updateRecordPeopleService?: UpdateRecordPeopleService,
  evaluatorNoteService?: EvaluatorNoteService
}

export class UpdateEvaluatorNoteService {
    private evaluatorNoteRepository: EvaluatorNoteRepository
    private logger: LoggerService = new LoggerService()
    private updateRecordPeopleService: UpdateRecordPeopleService
    private evaluatorNoteService: EvaluatorNoteService

    constructor ({
      evaluatorNoteRepository = getCustomRepository(EvaluatorNoteRepository),
      updateRecordPeopleService = new UpdateRecordPeopleService({}),
      evaluatorNoteService = new EvaluatorNoteService()
    }: IEvaluatorNoteService) {
      this.evaluatorNoteRepository = evaluatorNoteRepository
      this.updateRecordPeopleService = updateRecordPeopleService
      this.evaluatorNoteService = evaluatorNoteService
    }

    async execute (
      evaluatorId: string,
      peopleId: string,
      notes: {
        evidenceId: string
        note: number
      }[]
    ) {
      this.logger.trace(
        'Updating note',
        this.constructor.name
      )

      let affectedCountRows = 0

      for (const note of notes) {
        await this.evaluatorNoteRepository.updateEvaluatorNote(
          evaluatorId,
          note.evidenceId,
          peopleId,
          note.note
        )
          .then(async updateResult => {
            if (updateResult.affected > 0) {
              affectedCountRows++
              await this.getEvaluatorNotes(note.evidenceId, peopleId)
                .then(async evaluatorNotes => {
                  const average = this.calulateAverage(evaluatorNotes)
                  if (average) {
                    await this.updateRecordPeople(peopleId, note.evidenceId, average)
                  }
                })
            }
          })
      }

      return { affected: affectedCountRows }
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
      return this.evaluatorNoteService.execute(evidenceId, peopleId)
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
