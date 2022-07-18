import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { EvaluatorNote } from '../common/entities/EvaluatorNote';
import { RecordPeopleService } from '../recordPeople/service/recordPeople.service';
import { getMockEvaluatorNote } from '../__mocks__/mockEvaluatorNote';
import { getMockUpdateEvaluatorNoteRequest } from '../__mocks__/mockUpdateEvaluatorNoteRequest';
import { EvaluatorNoteController } from './evaluatorNote.controller';
import { EvaluatorNoteService } from './service/evaluatorNote.service';

describe('EvaluatorNoteController', () => {
  let controller: EvaluatorNoteController;
  let mockRecordPeopleService: RecordPeopleService
  let mockLogger: Logger;
  let mockEvaluatorNoteService: EvaluatorNoteService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvaluatorNoteController],
      providers: [
        EvaluatorNoteService,
        {
          provide: getRepositoryToken(EvaluatorNote),
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
          provide: RecordPeopleService,
          useValue: {}
        }
      ],
    }).compile();

    controller = module.get<EvaluatorNoteController>(EvaluatorNoteController);
    mockEvaluatorNoteService = module.get<EvaluatorNoteService>(EvaluatorNoteService)
    mockLogger = module.get<Logger>(Logger)
    mockRecordPeopleService = module.get<RecordPeopleService>(RecordPeopleService)
  });

  it('should return a array with evaluator notes', async () => {
    const mockPeopleId = randomUUID().toString()
    const mockEvaluatorNote = getMockEvaluatorNote({peopleId: mockPeopleId})
    jest.spyOn(mockEvaluatorNoteService, 'getEvaluatorNoteByPeopleId').mockImplementation(() => Promise.resolve([mockEvaluatorNote]))
    
    const response = await controller.getEvaluatorNoteByPeopleId(mockPeopleId)
    expect(mockLogger.log).toBeCalledWith(
      `Getting evaluatorNotes to peopleId: ${mockPeopleId}`
    )
    expect(response).toHaveLength(1)
    response.forEach(evaluatorNote => {
      expect(evaluatorNote.evaluation_id).toBeDefined()
      expect(evaluatorNote.evaluator_id).toBeDefined()
      expect(evaluatorNote.evidence_id).toBeDefined()
      expect(evaluatorNote).toMatchObject({
        people_id: mockPeopleId,
        evidenceId: {
          evidence_id: evaluatorNote.evidence_id,
          name: 'evidence',
          desc: 'desc'
        }
      })
    })
  });

  it('should return a number of rows affected', async () => {
    const mockUpdateEvaluatorNoteRequest = getMockUpdateEvaluatorNoteRequest({})
    jest.spyOn(mockEvaluatorNoteService, 'updateEvaluatorNote').mockImplementation(() => Promise.resolve({ affected: 1 }))
    const response = await controller.updateEvaluatorNote(mockUpdateEvaluatorNoteRequest)
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Updating evaluatorNotes ${JSON.stringify(mockUpdateEvaluatorNoteRequest)}`
    )
    expect(mockEvaluatorNoteService.updateEvaluatorNote).toHaveBeenCalledWith(mockUpdateEvaluatorNoteRequest)
    expect(response).toMatchObject({ affected: 1 })
  })
});
