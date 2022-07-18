import { Body, Controller, Get, Logger, Param, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EvaluatorNote } from '../common/entities/EvaluatorNote';
import { UpdateEvaluatorNoteRequest } from './dto/updateEvaluatorNoteRequest.dto';
import { EvaluatorNoteService } from './service/evaluatorNote.service';

@Controller('evaluatornote')
export class EvaluatorNoteController {
  constructor(
    private readonly evaluatorNoteService: EvaluatorNoteService,
    private readonly logger: Logger = new Logger(EvaluatorNoteController.name)
    ) {}

  @UseGuards(AuthGuard('authEvaluator'))
  @Get(':peopleId')
  getEvaluatorNoteByPeopleId(@Param('peopleId') peopleId: string): Promise<EvaluatorNote[]> {
    this.logger.log(
      `Getting evaluatorNotes to peopleId: ${peopleId}`
    )

    return this.evaluatorNoteService.getEvaluatorNoteByPeopleId(peopleId)
  }
  
  @UseGuards(AuthGuard('authEvaluator'))
  @Put()
  updateEvaluatorNote(@Body(new ValidationPipe) body: UpdateEvaluatorNoteRequest) {
    this.logger.log(
      `Updating evaluatorNotes ${JSON.stringify(body)}`
    )

    return this.evaluatorNoteService.updateEvaluatorNote(body)
  }
}
