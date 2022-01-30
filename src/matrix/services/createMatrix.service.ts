import { getCustomRepository } from 'typeorm'
import { Matrix } from '../../common/entities/Matrix'
import { LoggerService } from '../../common/LoggerService'
import { MatrixRepository } from '../../common/repositories/matrix.repository'

interface IMatrixRepository {
    matrixRepository?: MatrixRepository,
    name: string,
    desc?: string
}

export class CreateMatrixService {
    private matrixRepository: MatrixRepository
    private matrix: Matrix
    private logger: LoggerService = new LoggerService()

    constructor ({
      matrixRepository = getCustomRepository(MatrixRepository),
      name,
      desc
    }: IMatrixRepository) {
      this.matrixRepository = matrixRepository
      this.matrix = new Matrix(name, desc)
    }

    async execute (): Promise<Matrix> {
      this.logger.trace(
        'Creating evidence',
        this.constructor.name
      )
      return await this.matrixRepository.save(this.matrix)
    }
}
