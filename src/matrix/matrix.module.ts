import { Logger, Module } from '@nestjs/common';
import { MatrixService } from './service/matrix.service';
import { MatrixController } from './matrix.controller';
import { Matrix } from '../common/entities/Matrix';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Matrix])
  ],
  controllers: [
    MatrixController
  ],
  providers: [
    MatrixService,
    Logger
  ]
})
export class MatrixModule {}
