import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { MappingNote } from '../common/entities/MappingNote';
import { EvaluationMatrixService } from '../evaluationMatrix/service/evaluationMatrix.service';
import { MappingService } from '../mapping/mapping.service';
import { RecordPeopleService } from '../recordPeople/service/recordPeople.service';
import { MappingNoteController } from './mappingNote.controller';
import { MappingNoteService } from './service/mappingNote.service';

describe('MappingNoteController', () => {
  let controller: MappingNoteController;
  let mockMappingNoteService: MappingNoteService
  let mockLogger: Logger
  let mockMappingService: MappingService
  let mockRecordPeopleService: RecordPeopleService
  let mockEvaluationMatrixService: EvaluationMatrixService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MappingNoteController],
      providers: [
        MappingNoteService,
        {
          provide: getRepositoryToken(MappingNote),
          useValue: {}
        },
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
            error: jest.fn()
          }
        },
        {
          provide: MappingService,
          useValue: {
            getMapping: jest.fn()
          }
        },
        {
          provide: RecordPeopleService,
          useValue: {
            getRecordPeople: jest.fn()
          }
        },
        {
          provide: EvaluationMatrixService,
          useValue: {
            getWeightSkill: jest.fn()
          }
        }
      ],
    }).compile();

    controller = module.get<MappingNoteController>(MappingNoteController);
    mockMappingNoteService = module.get<MappingNoteService>(MappingNoteService)
    mockLogger = module.get<Logger>(Logger)
    mockMappingService = module.get<MappingService>(MappingService)
    mockRecordPeopleService = module.get<RecordPeopleService>(RecordPeopleService)
    mockEvaluationMatrixService = module.get<EvaluationMatrixService>(EvaluationMatrixService)
  });

  it('should return a number of lines updated', async () => {
    const mockMappingId = randomUUID()
    const mockUpdateRequest = {
      mappingId: mockMappingId
    }
    jest.spyOn(mockMappingNoteService, 'updateMappingNote').mockImplementation(() => Promise.resolve({
      affected: 1
    }))

    const response = await controller.updateMappingNote(mockUpdateRequest)
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Updating mappingNote from ${JSON.stringify(mockUpdateRequest)}`
    )
    expect(mockMappingNoteService.updateMappingNote).toHaveBeenCalledWith(mockMappingId)
    expect(response).toMatchObject({
      affected: 1
    })
  });
});
