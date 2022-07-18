import { IsNotEmpty } from 'class-validator'
import { errorCodes } from '../../common/errorCodes'

export class UpdateEvaluatorNoteRequest {
  @IsNotEmpty({ message: errorCodes.EVALUATOR_ID_REQUIRED })
  evaluatorId: string

  @IsNotEmpty({ message: errorCodes.EVIDENCE_ID_REQUIRED })
  evidenceId: string

  @IsNotEmpty({ message: errorCodes.PEOPLE_ID_REQUIRED })
  peopleId: string

  @IsNotEmpty({ message: errorCodes.NOTE_REQUIRED })
  note: number
}
