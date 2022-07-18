import { Controller, Post, Body, ValidationPipe, Logger, UseGuards } from '@nestjs/common';
import { MatrixService } from './service/matrix.service';
import { MatrixRequest } from './dto/matrixRequest.dto';
import { Matrix } from 'src/common/entities/Matrix';
import { AuthGuard } from '@nestjs/passport';

@Controller('matrix')
export class MatrixController {
  constructor(
    private readonly matrixService: MatrixService,
    private readonly logger: Logger = new Logger(MatrixController.name)
    ) {}

  @UseGuards(AuthGuard('authAdmin'))
  @Post()
  createMatrix(@Body(new ValidationPipe) body: MatrixRequest): Promise<Matrix> {
    this.logger.log(
      `Request received with with Matrix: ${body.name}`
    )

    return this.matrixService.createMatrix(body)
  }
}
