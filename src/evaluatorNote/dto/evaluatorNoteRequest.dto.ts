import { IsNotEmpty, IsNumber, ValidateIf } from 'class-validator'
import { errorCodes } from '../../common/errorCodes'

export class EvaluatorNoteRequest {
  @IsNotEmpty({ message: errorCodes.EVALUATOR_ID_REQUIRED })
  evaluatorId: string

  @IsNotEmpty({ message: errorCodes.PEOPLE_ID_REQUIRED })
  peopleId: string

  @IsNotEmpty({ message: errorCodes.EVIDENCE_ID_REQUIRED })
  evidenceId: string

  @ValidateIf(evaluatorNote => evaluatorNote.note !== undefined)
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 },
    { message: errorCodes.NON_NUMERIC_VALUE }
  )
  note: number

  constructor (body: {
    evaluatorId: string,
    peopleId: string,
    evidenceId: string,
    note: number
  }) {
    this.evaluatorId = body.evaluatorId
    this.peopleId = body.peopleId
    this.evidenceId = body.evidenceId
    this.note = body.note
  }
}
