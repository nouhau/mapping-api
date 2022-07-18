import { IsNotEmpty } from 'class-validator'
import { errorCodes } from '../../common/errorCodes'

export class UpdateRecordPeopleRequest {
  @IsNotEmpty({ message: errorCodes.PEOPLE_ID_REQUIRED })
  peopleId: string

  @IsNotEmpty({ message: errorCodes.EVIDENCE_ID_REQUIRED })
  evidenceId: string

  @IsNotEmpty({ message: errorCodes.NOTE_REQUIRED })
  average: number
}
