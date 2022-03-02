import { IsNotEmpty, IsNumber, ValidateIf } from 'class-validator'
import { errorCodes } from '../../common/errorCodes'

export class RecordPeopleRequest {
  @IsNotEmpty({ message: errorCodes.PEOPLE_ID_REQUIRED })
  peopleId: string

  @IsNotEmpty({ message: errorCodes.EVIDENCE_ID_REQUIRED })
  evidenceId: string

  @ValidateIf(recordPeople => recordPeople.evaluator_1 !== undefined)
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 },
    { message: errorCodes.NON_NUMERIC_VALUE }
  )
  evaluator_1: number

  @ValidateIf(recordPeople => recordPeople.evaluator_2 !== undefined)
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 },
    { message: errorCodes.NON_NUMERIC_VALUE }
  )
  evaluator_2: number

  constructor (body: {
    peopleId: string,
    evidenceId: string,
    evaluator_1?: number,
    evaluator_2?: number
  }) {
    this.peopleId = body.peopleId
    this.evidenceId = body.evidenceId
    this.evaluator_1 = body.evaluator_1
    this.evaluator_2 = body.evaluator_2
  }
}
