import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { Matrix } from '../../common/entities/Matrix';
import { getMockMatrixRequest } from '../../__mocks__/mockMatrixRequest';
import { MatrixService } from './matrix.service';

describe('MatrixService', () => {
  let service: MatrixService;
  let mockLogger: Logger;
  let mockMatrixRepository: Repository<Matrix>

  const MATRIX_REPOSITORY_TOKEN = getRepositoryToken(Matrix)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatrixService,
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
            error: jest.fn()
          }
        },
        {
          provide: MATRIX_REPOSITORY_TOKEN,
          useValue: {
            save: jest.fn()
          }
        }
      ],
    }).compile();

    service = module.get<MatrixService>(MatrixService);
    mockLogger = module.get<Logger>(Logger)
    mockMatrixRepository = module.get<Repository<Matrix>>(MATRIX_REPOSITORY_TOKEN)
  });

  it('should retun a new matrix', async () => {
    const mockMatrixRequest = getMockMatrixRequest()
    const mockMatrixReturn = {
      ...mockMatrixRequest,
      matrix_id: randomUUID().toString(),
      active: true,
      created_at: new Date()
    }

    jest.spyOn(mockMatrixRepository, 'save').mockImplementation(() => Promise.resolve(mockMatrixReturn))

    const matrix = await service.createMatrix(mockMatrixRequest)
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Creating matrix: ${mockMatrixRequest.name}`
    )
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Matrix created ${mockMatrixReturn.matrix_id}`
    )
    expect(matrix.matrix_id).toBeDefined()
    expect(matrix.active).toBeTruthy()
    expect(matrix.created_at).toBeDefined()
    expect(matrix).toMatchObject({
      name: 'string',
      desc: 'desc string'
    })
  });
});
