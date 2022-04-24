import { IsNotEmpty } from 'class-validator'
import { errorCodes } from '../../common/errorCodes'

export class MappingNoteRequest {
  @IsNotEmpty({ message: errorCodes.MAPPING_ID_REQUIRED })
  mappingId: string

  constructor (body: {
    mappingId: string,
  }) {
    this.mappingId = body.mappingId
  }
}
