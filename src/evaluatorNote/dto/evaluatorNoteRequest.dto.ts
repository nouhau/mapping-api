import { IsNotEmpty, IsArray, ValidateIf } from 'class-validator'
import { errorCodes } from '../../common/errorCodes'

export class EvaluatorNoteRequest {
  @IsNotEmpty({ message: errorCodes.EVALUATOR_ID_REQUIRED })
  evaluatorId: string

  @IsNotEmpty({ message: errorCodes.PEOPLE_ID_REQUIRED })
  peopleId: string

  @IsNotEmpty({ message: errorCodes.NOTE_REQUIRED })
  @IsArray(
    { message: errorCodes.NON_NUMERIC_VALUE }
  )
  notes: []

  constructor (body: {
    evaluatorId: string,
    peopleId: string,
    notes: []
  }) {
    this.evaluatorId = body.evaluatorId
    this.peopleId = body.peopleId
    this.notes = body.notes
  }
}
