import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Matrix } from '../common/entities/Matrix';
import { getMockMatrixRequest } from '../__mocks__/mockMatrixRequest';
import { MatrixController } from './matrix.controller';
import { MatrixService } from './service/matrix.service';

describe('MatrixController', () => {
  let controller: MatrixController;
  let mockMatrixService: MatrixService;
  let mockLogger: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatrixController],
      providers: [
        MatrixService,
        {
          provide: getRepositoryToken(Matrix),
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

    controller = module.get<MatrixController>(MatrixController);
    mockMatrixService = module.get<MatrixService>(MatrixService);
    mockLogger = module.get<Logger>(Logger);
  });

  it('return a new matrix', async () => {
    const mockMatrixRequest = getMockMatrixRequest()
    const mockMatrixReturn = {
      ...mockMatrixRequest,
      matrix_id: randomUUID().toString(),
      active: true,
      created_at: new Date()
    }

    jest.spyOn(mockMatrixService, 'createMatrix').mockImplementation(() => Promise.resolve(mockMatrixReturn))

    const matrix = await controller.createMatrix(mockMatrixRequest)
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Request received with with Matrix: ${mockMatrixRequest.name}`
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
