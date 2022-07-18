import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { RecordPeople } from '../common/entities/RecordPeople';
import { getMockRecordPeople } from '../__mocks__/mockRecordPeople';
import { RecordPeopleController } from './recordPeople.controller';
import { RecordPeopleService } from './service/recordPeople.service';

describe('RecordPeopleController', () => {
  let controller: RecordPeopleController;
  let mockRecordPeopleService: RecordPeopleService;
  let mockLogger: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecordPeopleController],
      providers: [
        RecordPeopleService,
        {
          provide: getRepositoryToken(RecordPeople),
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

    controller = module.get<RecordPeopleController>(RecordPeopleController);
    mockRecordPeopleService = module.get<RecordPeopleService>(RecordPeopleService);
    mockLogger = module.get<Logger>(Logger);
  });

  it('should be return a array with records', async () => {
    const mockPeopleId = randomUUID()
    const mockEvidenceId = randomUUID()
    const mockRecordPeople = getMockRecordPeople({
      peopleId: mockPeopleId,
      evidenceId: mockEvidenceId
    })
    jest.spyOn(mockRecordPeopleService, 'getRecordPeople').mockImplementation(() => Promise.resolve([mockRecordPeople]))

    const response = await controller.getRecordPeople(mockPeopleId)
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Getting records for ${mockPeopleId}`
    )
    expect(mockRecordPeopleService.getRecordPeople).toHaveBeenCalledWith(mockPeopleId)
    expect(response).toHaveLength(1)
    expect(response[0].record_id).toBeDefined()
    expect(response[0]).toMatchObject({
      evidence_id: mockEvidenceId,
      people_id: mockPeopleId,
      average: 1,
      evidenceId: {
        evidence_id: mockEvidenceId,
        name: 'evidence',
        desc: 'desc'
      }
    })
  });
});
