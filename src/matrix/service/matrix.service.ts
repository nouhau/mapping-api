import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Matrix } from '../../common/entities/Matrix';
import { Repository } from 'typeorm';
import { MatrixRequest } from '../dto/matrixRequest.dto';

@Injectable()
export class MatrixService {

  constructor(
    private readonly logger: Logger = new Logger(MatrixService.name),
    @InjectRepository(Matrix) private matrixRepository: Repository<Matrix>
  ) {}

  
  createMatrix = async (matrixRequest: MatrixRequest): Promise<Matrix> => {
    this.logger.log(
      `Creating matrix: ${matrixRequest.name}`
    )

    const newMatrix: Matrix = new Matrix(matrixRequest.name, matrixRequest.desc)

    const matrix: Matrix = await this.matrixRepository.save(newMatrix)

    this.logger.log(
      `Matrix created ${matrix.matrix_id}`
    )

    return matrix
  }
}
