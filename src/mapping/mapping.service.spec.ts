import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getMockMapping } from '../__mocks__/mockMapping';
import { Mapping } from '../common/entities/Mapping';
import { MappingService } from './mapping.service';
import { randomUUID } from 'crypto';

describe('MappingService', () => {
  let service: MappingService;
  let mockLogger: Logger
  let mockMappingRepository: Repository<Mapping>

  const MAPPING_REPOSITORY_TOKEN = getRepositoryToken(Mapping)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MappingService,
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
            error: jest.fn()
          }
        },
        {
          provide: MAPPING_REPOSITORY_TOKEN,
          useValue: {
            findOne: jest.fn()
          }
        }
      ],
    }).compile();

    service = module.get<MappingService>(MappingService);
    mockLogger = module.get<Logger>(Logger)
    mockMappingRepository = module.get<Repository<Mapping>>(MAPPING_REPOSITORY_TOKEN)
  });

  it('should be return a mapping', async () => {
    const mockMappingId = randomUUID()
    const mockMapping = getMockMapping({
      mappingId: mockMappingId
    })
    jest.spyOn(mockMappingRepository, 'findOne').mockImplementation(() => Promise.resolve(mockMapping))

    const mapping = await service.getMapping(mockMappingId)
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Getting mapping for ${mockMappingId}`
    )
    expect(mockMappingRepository.findOne).toHaveBeenCalledWith({
      where: {
        mapping_id: mockMappingId
      }
    })
    expect(mapping.matrix_id).toBeDefined()
    expect(mapping.people_id).toBeDefined()
    expect(mapping.mapping_id).toBe(mockMappingId)
  });
});
