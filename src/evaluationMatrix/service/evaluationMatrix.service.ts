import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EvaluationMatrix } from '../../common/entities/EvaluationMatrix';

@Injectable()
export class EvaluationMatrixService {
  constructor(
    private readonly logger: Logger = new Logger(EvaluationMatrixService.name),
    @InjectRepository(EvaluationMatrix) private evaluationMatrixRepository: Repository<EvaluationMatrix>
  ) {}
  
  getMain = async (): Promise<EvaluationMatrix[]> => {
    this.logger.log(
      `Getting main matrix`
    )

    const mainEvaluationMatrix: EvaluationMatrix[] = await this.evaluationMatrixRepository.find({
      where: {
        matrix_id: '192f8754-69ad-4e0d-b529-211e8aa53812'
      },
      relations: ['matrixId', 'evidenceId', 'skillId']
    })

    return mainEvaluationMatrix
  }

  getWeightSkill = async (skillId: string, matrixId: string): Promise<EvaluationMatrix[]> => {
    this.logger.log(
      `Getting skills with weight`
    )

    const evaluationMatrix: EvaluationMatrix[] = await this.evaluationMatrixRepository.find({
      where: {
        skill_id: skillId,
        matrix_id: matrixId
      },
      relations: ['matrixId', 'evidenceId', 'skillId']
    })

    return evaluationMatrix
  }
}
