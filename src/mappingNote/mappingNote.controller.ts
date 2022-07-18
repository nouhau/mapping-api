import { Controller, Body, Put, Logger, ValidationPipe, UseGuards } from '@nestjs/common';
import { MappingNoteService } from './service/mappingNote.service';
import { UpdateMappingNoteRequest } from './dto/updateMappingNoteRequest.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('mapping')
export class MappingNoteController {
  constructor(
    private readonly mappingNoteService: MappingNoteService,
    private readonly logger: Logger = new Logger(MappingNoteController.name)
    ) {}

  @UseGuards(AuthGuard('authEvaluator'))
  @Put()
  updateMappingNote(@Body(new ValidationPipe) body: UpdateMappingNoteRequest) {
    this.logger.log(
      `Updating mappingNote from ${JSON.stringify(body)}`
    )

    return this.mappingNoteService.updateMappingNote(body.mappingId)
  }
}
