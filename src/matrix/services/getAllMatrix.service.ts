import { getCustomRepository } from 'typeorm'
import { Matrix } from '../../common/entities/Matrix'
import { LoggerService } from '../../common/LoggerService'
import { MatrixRepository } from '../../common/repositories/matrix.repository'

export class GetAllMatrixService {
    private matrixRepository: MatrixRepository
    private logger: LoggerService = new LoggerService()

    constructor (
      matrixRepository: MatrixRepository = getCustomRepository(MatrixRepository)) {
      this.matrixRepository = matrixRepository
    }

    async execute (): Promise<Matrix[]> {
      this.logger.trace(
        'Getting matrix',
        this.constructor.name
      )
      return await this.matrixRepository.getAll()
    }
}
