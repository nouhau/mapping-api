import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { MappingNote } from '../common/entities/MappingNote';
import { EvaluationMatrixService } from '../evaluationMatrix/service/evaluationMatrix.service';
import { MappingService } from '../mapping/service/mapping.service';
import { RecordPeopleService } from '../recordPeople/service/recordPeople.service';
import { getMockMapping } from '../__mocks__/mockMapping';
import { getMockMappingNote } from '../__mocks__/mockMappingNote';
import { MappingNoteController } from './mappingNote.controller';
import { MappingNoteService } from './service/mappingNote.service';

describe('MappingNoteController', () => {
  let controller: MappingNoteController;
  let mockMappingNoteService: MappingNoteService
  let mockLogger: Logger
  let mockMappingService: MappingService
  let mockRecordPeopleService: RecordPeopleService
  let mockEvaluationMatrixService: EvaluationMatrixService

  const mockMappingId = randomUUID()

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

  it('should return mapping and mappingNotes', async () => {
    const mockPeopleId = randomUUID()
    const mockSkillId = randomUUID()
    const mockMatrixId = randomUUID()
    const mockMapping = getMockMapping({
      mappingId: mockMappingId,
      peopleId: mockPeopleId,
      matrixId: mockMatrixId
    })
    const mockMappingNote = getMockMappingNote({
      mappingId: mockMappingId,
      skillId: mockSkillId,
      peopleId: mockPeopleId,
      matrixId: mockMatrixId
    })
    const mockGetMappingByPeopleId = jest.spyOn(mockMappingNoteService, 'getMappingByPeopleId').mockImplementation(() => Promise.resolve(mockMapping))
    const mockGetMappingNote = jest.spyOn(mockMappingNoteService, 'getMappingNote').mockImplementation(() => Promise.resolve([mockMappingNote]))
    const response = await controller.getMapping(mockPeopleId)
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Getting mapping from ${mockPeopleId}`
    )
    expect(mockGetMappingByPeopleId).toHaveBeenCalledWith(mockPeopleId)
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Getting mappingNote with mappingNote ${mockMappingId}`
    )
    expect(mockGetMappingNote).toHaveBeenCalledWith(mockMappingId)
    expect(response.mapping).toMatchObject({
      mapping_id: mockMappingId,
      people_id: mockPeopleId,
      matrix_id: mockMatrixId,
      feedback: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    })
    response.mappingNotes.forEach(mappingNote => {
      expect(mappingNote.mappingNote_id).toBeDefined()
      expect(mappingNote.skill_id).toBeDefined()
      expect(mappingNote.skillId.skill_id).toBeDefined()
      expect(mappingNote).toMatchObject({
        mapping_id: mockMappingId,
        note: 2,
        mappingId: {
          mapping_id: mockMappingId,
          people_id: mockPeopleId,
          matrix_id: mockMatrixId,
          feedback: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        skillId: {
          name: 'skill',
          desc: 'desc'
        }
      })
    })
  })
});
