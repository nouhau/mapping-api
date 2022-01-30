import { getCustomRepository } from 'typeorm'
import { EvaluationMatrix } from '../../common/entities/EvaluationMatrix'
import { LoggerService } from '../../common/LoggerService'
import { EvaluationMatrixRepository } from '../../common/repositories/evaluationMatrix.repository'

export class GetEvaluationMatrixService {
    private evaluationMatrixRepository: EvaluationMatrixRepository
    private logger: LoggerService = new LoggerService()

    constructor (
      evaluationMatrixRepository: EvaluationMatrixRepository = getCustomRepository(EvaluationMatrixRepository)) {
      this.evaluationMatrixRepository = evaluationMatrixRepository
    }

    async execute (): Promise<EvaluationMatrix[]> {
      this.logger.trace(
        'Getting matrix',
        this.constructor.name
      )
      return await this.evaluationMatrixRepository.getMain()
    }
}
