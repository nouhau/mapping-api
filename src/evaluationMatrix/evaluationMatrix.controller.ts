import { Controller, Get, Logger } from '@nestjs/common';
import { EvaluationMatrixService } from './service/evaluationMatrix.service';

@Controller('evaluation')
export class EvaluationMatrixController {
  constructor(
    private readonly evaluationMatrixService: EvaluationMatrixService,
    private readonly logger: Logger = new Logger(EvaluationMatrixService.name)
    ) {}

  @Get()
  getMain() {
    this.logger.log(
      `Request main matrix`
    )
    
    return this.evaluationMatrixService.getMain()
  }
}
