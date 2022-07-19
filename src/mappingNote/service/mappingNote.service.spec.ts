import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository, UpdateResult } from 'typeorm';
import { getMockMappingNote } from '../../__mocks__/mockMappingNote';
import { MappingNote } from '../../common/entities/MappingNote';
import { MappingNoteService } from './mappingNote.service';
import { getMockMapping } from '../../__mocks__/mockMapping';
import { MappingService } from '../../mapping/service/mapping.service';
import { RecordPeopleService } from '../../recordPeople/service/recordPeople.service';
import { getMockRecordPeople } from '../../__mocks__/mockRecordPeople';
import { EvaluationMatrixService } from '../../evaluationMatrix/service/evaluationMatrix.service';
import { getMockEvaluationMatrix } from '../../__mocks__/mockEvaluationMatrix';

describe('MappingNoteService', () => {
  let service: MappingNoteService;
  let mockLogger: Logger
  let mockMappingNoteRepository: Repository<MappingNote>
  let mockMappingService: MappingService
  let mockRecordPeopleService: RecordPeopleService
  let mockEvaluationMatrixService: EvaluationMatrixService

  const mockMappingId = randomUUID()
  const mockPeopleId = randomUUID()
  const mockEvidenceId = randomUUID()
  const mockSkillId = randomUUID()
  const mockMatrixId = randomUUID()
  
  const mockRecordPeople = getMockRecordPeople({
    peopleId: mockPeopleId,
    evidenceId: mockEvidenceId
  })
  const mockMapping = getMockMapping({
    mappingId: mockMappingId
  })
  const mockMappingNote = getMockMappingNote({
    mappingId: mockMappingId,
    skillId: mockSkillId
  })
  const mockEvaluationMatrix = getMockEvaluationMatrix({
    mockSkillId,
    mockMatrixId,
    mockEvidenceId
  })

  const MAPPING_NOTE_REPOSITORY_TOKEN = getRepositoryToken(MappingNote)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MappingNoteService,
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
            error: jest.fn()
          }
        },
        {
          provide: MAPPING_NOTE_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn(),
            update: jest.fn()
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

    service = module.get<MappingNoteService>(MappingNoteService);
    mockLogger = module.get<Logger>(Logger)
    mockMappingNoteRepository = module.get<Repository<MappingNote>>(MAPPING_NOTE_REPOSITORY_TOKEN)
    mockMappingService = module.get<MappingService>(MappingService)
    mockRecordPeopleService = module.get<RecordPeopleService>(RecordPeopleService)
    mockEvaluationMatrixService = module.get<EvaluationMatrixService>(EvaluationMatrixService)

  });

  it('should be return array with mappingNotes', async () => {
    jest.spyOn(mockMappingNoteRepository, 'find').mockImplementation(() => Promise.resolve([mockMappingNote]))
    const mappingNote = await service.getMappingNote(mockMappingId)
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Getting mappingNote from ${mockMappingId}`
    )
    expect(mockMappingNoteRepository.find).toHaveBeenCalledWith({
      where: {
        mapping_id: mockMappingId
      },
      relations: ['skillId', 'mappingId']
    })
    expect(mappingNote).toHaveLength(1)
    expect(mappingNote[0].mappingNote_id).toBeDefined()
    expect(mappingNote[0].skillId.skill_id).toBeDefined()
    expect(mappingNote[0]).toMatchObject({
      mapping_id: mockMappingId,
      note: 2,
      mappingId: {
        mapping_id: mockMappingId
      },
      skillId: {
        name: 'skill',
        desc: 'desc'
      }
    })
  });

  it('should be update mappingNote', async () => {
    const differentSkillId = randomUUID()
    const secondMockEvaluationMatrix = getMockEvaluationMatrix({
      mockSkillId,
      mockMatrixId,
      mockEvidenceId,
      value: 3
    })
    const ignoredMockEvaluationMatrix = getMockEvaluationMatrix({
      mockSkillId: differentSkillId,
      mockMatrixId
    })
    const mockUpdateResponse: UpdateResult = {
      raw: '',
      affected: 1,
      generatedMaps: [{}]
    }
    const mockGetMapping = jest.spyOn(mockMappingService, 'getMapping').mockImplementation(() => Promise.resolve(mockMapping))
    const mockGetmappingNote = jest.spyOn(service, 'getMappingNote').mockImplementation(() => Promise.resolve([mockMappingNote]))
    const mockGetRecordPeople = jest.spyOn(service, 'getRecordPeople').mockImplementation(() => Promise.resolve([mockRecordPeople]))
    const mockGetWeightSkill = jest.spyOn(service, 'getWeightSkill').mockImplementation(() => Promise.resolve([
      mockEvaluationMatrix,
      secondMockEvaluationMatrix,
      ignoredMockEvaluationMatrix
    ]))
    jest.spyOn(mockMappingNoteRepository, 'update').mockImplementation(() => Promise.resolve(mockUpdateResponse))

    const response = await service.updateMappingNote(mockMappingId)
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Updating mappingNote from ${mockMappingId}`
    )
    expect(mockGetMapping).toHaveBeenCalledWith(mockMappingId)
    expect(mockGetmappingNote).toHaveBeenCalledWith(mockMappingId)
    expect(mockGetRecordPeople).toHaveBeenCalledWith(mockMapping.people_id)
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Updating mappingNotes with mappingId: ${mockMappingId}, skillId: ${mockSkillId} with note: 1`
    )
    expect(mockGetWeightSkill).toHaveBeenCalledWith(mockMappingNote.skill_id, mockMapping.matrix_id)
    expect(mockMappingNoteRepository.update).toHaveBeenCalledWith({
      mapping_id: mockMappingId,
      skill_id: mockSkillId
    },
    {
      note: 1
    })
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Affected rows with this query, 1. Total affected rows, 1`
    )
    expect(response).toMatchObject({
      affected: 1
    })
  })

  it('should be return a mapping', async () => {
    jest.spyOn(mockMappingService, 'getMapping').mockImplementation(() => Promise.resolve(mockMapping))
    const mapping = await service.getMapping(mockMappingId)
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Getting mapping from ${mockMappingId}`
    )
    expect(mockMappingService.getMapping).toHaveBeenCalledWith(mockMappingId)
    expect(mapping.matrix_id).toBeDefined()
    expect(mapping.people_id).toBeDefined()
    expect(mapping.mapping_id).toBe(mockMappingId)
  })

  it('should be return a recordPeople with peopleId', async () => {
    jest.spyOn(mockRecordPeopleService, 'getRecordPeople').mockImplementation(() => Promise.resolve([mockRecordPeople]))
    const recordPeople = await service.getRecordPeople(mockPeopleId)
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Getting records from ${mockPeopleId}`
    )
    expect(mockRecordPeopleService.getRecordPeople).toHaveBeenCalledWith(mockPeopleId)
    expect(recordPeople).toHaveLength(1)
    expect(recordPeople[0].record_id).toBeDefined()
    expect(recordPeople[0]).toMatchObject({
      evidence_id: mockEvidenceId,
      people_id: mockPeopleId,
      average: 1,
      evidenceId: {
        evidence_id: mockEvidenceId,
        name: 'evidence',
        desc: 'desc'
      }
    })
  })

  it('should return a evaluationMatrix with skillId and matrixId', async () => {
    jest.spyOn(mockEvaluationMatrixService, 'getWeightSkill').mockImplementation(() => Promise.resolve([mockEvaluationMatrix]))
    const evaluationMatrix = await service.getWeightSkill(mockSkillId, mockMatrixId)
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Getting skills with weight for skill: ${mockSkillId}, matrix: ${mockMatrixId}`
    )
    expect(mockEvaluationMatrixService.getWeightSkill).toHaveBeenCalledWith(mockSkillId, mockMatrixId)
    expect(evaluationMatrix).toHaveLength(1)
    expect(evaluationMatrix[0].skillId.skill_id).toBe(mockSkillId)
    expect(evaluationMatrix[0].matrixId.matrix_id).toBe(mockMatrixId)
  })
});
