import { Controller, Body, Put, Logger, ValidationPipe, UseGuards, Get, Param } from '@nestjs/common';
import { MappingNoteService } from './service/mappingNote.service';
import { UpdateMappingNoteRequest } from './dto/updateMappingNoteRequest.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('mappingnote')
export class MappingNoteController {
  constructor(
    private readonly mappingNoteService: MappingNoteService,
    private readonly logger: Logger = new Logger(MappingNoteController.name)
    ) {}

  @UseGuards(AuthGuard('authEvaluator'))
  @Put()
  async updateMappingNote(@Body(new ValidationPipe) body: UpdateMappingNoteRequest): Promise<{ affected: number }> {
    this.logger.log(
      `Updating mappingNote from ${JSON.stringify(body)}`
    )

    return this.mappingNoteService.updateMappingNote(body.mappingId)
  }

  @Get(':peopleId')
  async getMapping(@Param('peopleId') peopleId: string) {
    this.logger.log(
      `Getting mapping from ${peopleId}`
    )

    const mapping = await this.mappingNoteService.getMappingByPeopleId(peopleId)

    this.logger.log(
      `Getting mappingNote with mappingNote ${mapping.mapping_id}`
    )

    const mappingNotes = await this.mappingNoteService.getMappingNote(mapping.mapping_id)

    return {
      mapping,
      mappingNotes
    }
  }
}
