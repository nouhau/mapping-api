import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { EvaluationMatrix } from '../../common/entities/EvaluationMatrix';
import { Evidence } from '../../common/entities/Evidence';
import { Matrix } from '../../common/entities/Matrix';
import { Skill } from '../../common/entities/Skill';
import { EvaluationMatrixService } from './evaluationMatrix.service';

describe('EvaluationMatrixService', () => {
  let service: EvaluationMatrixService;
  let mockLogger: Logger
  let mockEvaluationMatrixRepository: Repository<EvaluationMatrix>

  const EVALUATION_MATRIX_REPOSITORY_TOKEN = getRepositoryToken(EvaluationMatrix)

  const mockEvidence: Evidence = {
    evidence_id: randomUUID(),
    name: 'evidence',
    desc: 'desc'
  }

  const mockSkillId = randomUUID()
  const mockSkill: Skill = {
    skill_id: mockSkillId,
    name: 'skill',
    desc: 'desc'
  }

  const mockMatrixId = randomUUID()
  const mockMatrix: Matrix = {
    matrix_id: mockMatrixId,
    name: 'skill',
    desc: 'desc',
    active: true,
    created_at: new Date()
  }

  const mockEvaluationMatrix: EvaluationMatrix = {
    evaluation_matrix_id: '192f8754-69ad-4e0d-b529-211e8aa53812',
    evidence_id: mockEvidence.evidence_id,
    skill_id: mockSkill.skill_id,
    matrix_id: mockMatrix.matrix_id,
    value: 2,
    matrixId: mockMatrix,
    evidenceId: mockEvidence,
    skillId: mockSkill
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvaluationMatrixService,
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
            error: jest.fn()
          }
        },
        {
          provide: EVALUATION_MATRIX_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn().mockImplementation(() => Promise.resolve([mockEvaluationMatrix]))
          }
        }
      ],
    }).compile();

    service = module.get<EvaluationMatrixService>(EvaluationMatrixService);
    mockLogger = module.get<Logger>(Logger)
    mockEvaluationMatrixRepository = module.get<Repository<EvaluationMatrix>>(EVALUATION_MATRIX_REPOSITORY_TOKEN)
  });

  it('should return the main evaluationMatrix', async () => {
    const evaluationMatrix = await service.getMain()
    expect(mockLogger.log).toHaveBeenCalledWith(
      'Getting main matrix'
    )
    expect(mockEvaluationMatrixRepository.find).toHaveBeenCalledWith({
      where: {
        matrix_id: '192f8754-69ad-4e0d-b529-211e8aa53812'
      },
      relations: ['matrixId', 'evidenceId', 'skillId']
    })
    expect(evaluationMatrix).toHaveLength(1)
    expect(evaluationMatrix[0].evaluation_matrix_id).toBe('192f8754-69ad-4e0d-b529-211e8aa53812')
  });

  it('should return a evaluationMatrix with skillId and matrixId', async () => {
    const evaluationMatrix = await service.getWeightSkill(mockSkillId, mockMatrixId)
    expect(mockLogger.log).toHaveBeenCalledWith(
      'Getting skills with weight'
    )
    expect(mockEvaluationMatrixRepository.find).toHaveBeenCalledWith({
      where: {
        skill_id: mockSkillId,
        matrix_id: mockMatrixId
      },
      relations: ['matrixId', 'evidenceId', 'skillId']
    })
    expect(evaluationMatrix).toHaveLength(1)
    expect(evaluationMatrix[0].skillId.skill_id).toBe(mockSkillId)
    expect(evaluationMatrix[0].matrixId.matrix_id).toBe(mockMatrixId)
  })
});
