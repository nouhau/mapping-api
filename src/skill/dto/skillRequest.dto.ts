import { IsNotEmpty } from 'class-validator'
import { errorCodes } from '../../common/errorCodes'

export class SkillRequest {
  @IsNotEmpty({ message: errorCodes.NAME_REQUIRED })
  name: string

  @IsNotEmpty({ message: errorCodes.DESCRIPTION_REQUIRED })
  desc: string
}
