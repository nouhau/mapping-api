import { IsNotEmpty } from 'class-validator'
import { errorCodes } from '../../common/errorCodes'

export class UpdateMappingNoteRequest {
  @IsNotEmpty({ message: errorCodes.MAPPING_ID_REQUIRED })
  mappingId: string
}
