import { Logger, Module } from '@nestjs/common';
import { EvaluationMatrixService } from './service/evaluationMatrix.service';
import { EvaluationMatrixController } from './evaluationMatrix.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluationMatrix } from '../common/entities/EvaluationMatrix';

@Module({
  imports: [
    TypeOrmModule.forFeature([EvaluationMatrix])
  ],
  controllers: [
    EvaluationMatrixController
  ],
  providers: [
    EvaluationMatrixService,
    Logger
  ]
})
export class EvaluationMatrixModule {}
