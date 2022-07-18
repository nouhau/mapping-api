import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RecordPeopleService } from './recordPeople.service';
import { RecordPeople } from '../../common/entities/RecordPeople';
import { Repository, UpdateResult } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getMockUpdateRecordPeopleRequest } from '../../__mocks__/mockUpdateRecordPeopleRequest';
import { randomUUID } from 'crypto';
import { getMockRecordPeople } from '../../__mocks__/mockRecordPeople';

describe('RecordPeopleService', () => {
  let service: RecordPeopleService;
  let mockLogger: Logger;
  let mockRecordPeopleRepository: Repository<RecordPeople>

  const RECORD_PEOPLE_REPOSITORY_TOKEN = getRepositoryToken(RecordPeople)

  const mockPeopleId = randomUUID()
  const mockEvidenceId = randomUUID()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecordPeopleService,
        {
          provide: RECORD_PEOPLE_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn(),
            update: jest.fn()
          }
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

    service = module.get<RecordPeopleService>(RecordPeopleService);
    mockLogger = module.get<Logger>(Logger)
    mockRecordPeopleRepository = module.get<Repository<RecordPeople>>(RECORD_PEOPLE_REPOSITORY_TOKEN)
  });

  it('should be update recordPeople and return updateResult', async () => {
    const mockUpdateRecordPeopleRequest = getMockUpdateRecordPeopleRequest({
      peopleId: mockPeopleId,
      evidenceId: mockEvidenceId
    })
    const mockUpdateResponse: UpdateResult = {
      raw: '',
      affected: 1,
      generatedMaps: [{}]
    }
    jest.spyOn(mockRecordPeopleRepository, 'update').mockImplementation(() => Promise.resolve(mockUpdateResponse))

    const response = await service.updateRecordPeople(mockUpdateRecordPeopleRequest)
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Updaating recordPeople: ${JSON.stringify(mockUpdateRecordPeopleRequest)}`
    )
    expect(mockRecordPeopleRepository.update).toHaveBeenCalledWith({
      people_id: mockUpdateRecordPeopleRequest.peopleId,
      evidence_id: mockUpdateRecordPeopleRequest.evidenceId
    },
    {
      average: 1
    })
    expect(response).toMatchObject({
      affected: 1
    })
  });

  it('should be return recordPeople with peopleId', async() => {
    const mockRecordPeople = getMockRecordPeople({
      peopleId: mockPeopleId,
      evidenceId: mockEvidenceId
    })

    jest.spyOn(mockRecordPeopleRepository, 'find').mockImplementation(() => Promise.resolve([mockRecordPeople]))

    const recordPeople = await service.getRecordPeople(mockPeopleId)
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Getting recordPeople from ${mockPeopleId}`
    )
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Total records from ${mockPeopleId}: 1`
    )
    expect(mockRecordPeopleRepository.find).toHaveBeenCalledWith({
      where: {
        people_id: mockPeopleId
      },
      relations: ['evidenceId']
    })
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
});
