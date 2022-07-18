import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { EvaluationMatrix } from '../common/entities/EvaluationMatrix';
import { Evidence } from '../common/entities/Evidence';
import { Matrix } from '../common/entities/Matrix';
import { Skill } from '../common/entities/Skill';
import { EvaluationMatrixController } from './evaluationMatrix.controller';
import { EvaluationMatrixService } from './service/evaluationMatrix.service';

describe('EvaluationMatrixController', () => {
  let controller: EvaluationMatrixController;
  let mockEvaluationMatrixService: EvaluationMatrixService;
  let mockLogger: Logger

  const mockEvidence: Evidence = {
    evidence_id: randomUUID().toString(),
    name: 'evidence',
    desc: 'desc'
  }
  const mockSkill: Skill = {
    skill_id: randomUUID().toString(),
    name: 'skill',
    desc: 'desc'
  }
  const mockMatrix: Matrix = {
    matrix_id: randomUUID().toString(),
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
      controllers: [EvaluationMatrixController],
      providers: [
        EvaluationMatrixService,
        {
          provide: getRepositoryToken(EvaluationMatrix),
          useValue: {}
        },
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
            error: jest.fn()
          }
        }
      ],
    }).compile();

    controller = module.get<EvaluationMatrixController>(EvaluationMatrixController);
    mockEvaluationMatrixService = module.get<EvaluationMatrixService>(EvaluationMatrixService);
    mockLogger = module.get<Logger>(Logger);
  });

  it('return a main evaluation matrix', async () => {
    jest.spyOn(mockEvaluationMatrixService, 'getMain').mockImplementation(() => Promise.resolve([mockEvaluationMatrix]))
    const evaluationMatrix = await controller.getMain()
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Request main matrix`
    )
    expect(evaluationMatrix).toHaveLength(1)
    expect(evaluationMatrix[0].evaluation_matrix_id).toBe('192f8754-69ad-4e0d-b529-211e8aa53812')
  });
});
