import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EvaluatorNote } from '../../common/entities/EvaluatorNote';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateEvaluatorNoteRequest } from '../dto/updateEvaluatorNoteRequest.dto';
import { RecordPeopleService } from '../../recordPeople/service/recordPeople.service';

@Injectable()
export class EvaluatorNoteService {

  constructor(
    private readonly logger: Logger = new Logger(EvaluatorNoteService.name),
    @InjectRepository(EvaluatorNote) private evaluatorNoteRepository: Repository<EvaluatorNote>,
    private readonly recordPeopleService: RecordPeopleService
  ) {}

  getEvaluatorNoteByPeopleId = async (peopleId: string): Promise<EvaluatorNote[]> => {
    this.logger.log(
      `Getting evaluatorNotes by peopleId: ${peopleId}`
    )

    const evaluatorNotes: EvaluatorNote[] = await this.evaluatorNoteRepository.find({
        where: {
          people_id: peopleId
        },
        relations: ['evidenceId']
      })

    this.logger.log(
      `Total evaluatorNotes: ${evaluatorNotes.length}`
    )

    return evaluatorNotes
  }

  updateEvaluatorNote = async (updateEvaluatorNoteRequest: UpdateEvaluatorNoteRequest): Promise<{ affected: number }> => {
    this.logger.log(
      `Updating note: ${JSON.stringify(updateEvaluatorNoteRequest)}`
    )

    const updateEvaluatorNote: UpdateResult = await this.evaluatorNoteRepository.update({
      evaluator_id: updateEvaluatorNoteRequest.evaluatorId,
      evidence_id: updateEvaluatorNoteRequest.evidenceId,
      people_id: updateEvaluatorNoteRequest.peopleId
    },
    {
      note: updateEvaluatorNoteRequest.note
    })

    const evaluatorNotes: EvaluatorNote[] = await this.getEvaluatorNoteByPeopleId(updateEvaluatorNoteRequest.peopleId)
    const average: number | void = this.calulateAverage(evaluatorNotes)

    if(average){
      await this.updateRecordPeopleAverage(
        updateEvaluatorNoteRequest.peopleId,
        updateEvaluatorNoteRequest.evidenceId,
        average
      )

      return {
        affected: updateEvaluatorNote.affected + 1
      }
    }

    return {
      affected: updateEvaluatorNote.affected
    }
  }

  updateRecordPeopleAverage = async (
    peopleId: string,
    evidenceId: string,
    average: number
  ): Promise<void> => {
    this.logger.log(`Updating record people average to peopleId: ${peopleId}, evidenceId: ${evidenceId}, average: ${average}`)

    await this.recordPeopleService.updateRecordPeople({
      peopleId,
      evidenceId,
      average
    })
  }

  calulateAverage = (evaluatorNotes: EvaluatorNote[]): number | void => {
    if (evaluatorNotes.length >= 2) {
      this.logger.log(
        `Calculate new average`
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
