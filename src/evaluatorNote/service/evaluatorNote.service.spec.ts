import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { EvaluatorNoteService } from './evaluatorNote.service';
import { EvaluatorNote } from '../../common/entities/EvaluatorNote';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { getMockUpdateEvaluatorNoteRequest } from '../../__mocks__/mockUpdateEvaluatorNoteRequest';
import { getMockEvaluatorNote } from '../../__mocks__/mockEvaluatorNote';
import { RecordPeopleService } from '../../recordPeople/service/recordPeople.service';

describe('EvaluatorNoteService', () => {
  let service: EvaluatorNoteService;
  let mockRecordPeopleService: RecordPeopleService
  let mockLogger: Logger
  let mockEvaluatorNoteRepository: Repository<EvaluatorNote>

  const mockPeopleId = randomUUID()
  const mockEvaluatorId = randomUUID()
  const mockEvidenceId = randomUUID()
  const mockEvaluatorNote = getMockEvaluatorNote({peopleId: mockPeopleId})
  const anotherMockEvaluatorNote = getMockEvaluatorNote({
    peopleId: mockPeopleId,
    note: 2
  })
  const mockEvaluatoNoteWithTwoRegisters = [mockEvaluatorNote, anotherMockEvaluatorNote]

  const mockUpdateResponse = {
    raw: '',
    affected: 1,
    generatedMaps: [{}]
  }

  const EVALUATOR_NOTE_REPOSITORY_TOKEN = getRepositoryToken(EvaluatorNote)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvaluatorNoteService,
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
            error: jest.fn()
          }
        },
        {
          provide: EVALUATOR_NOTE_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn(),
            update: jest.fn()
          }
        },
        {
          provide: RecordPeopleService,
          useValue: {
            updateRecordPeople: jest.fn()
          }
        }
      ],
    }).compile();

    service = module.get<EvaluatorNoteService>(EvaluatorNoteService);
    mockLogger = module.get<Logger>(Logger)
    mockEvaluatorNoteRepository = module.get<Repository<EvaluatorNote>>(EVALUATOR_NOTE_REPOSITORY_TOKEN)
    mockRecordPeopleService = module.get<RecordPeopleService>(RecordPeopleService)
  });

  it('call getEvaluatorNoteByPeopleId and get array with evaluator note', async () => {
    jest.spyOn(mockEvaluatorNoteRepository, 'find').mockImplementation(() => Promise.resolve([mockEvaluatorNote]))
    
    const evaluatorNotes = await service.getEvaluatorNoteByPeopleId(mockPeopleId)
    expect(mockLogger.log).toBeCalledWith(
      `Getting evaluatorNotes by peopleId: ${mockPeopleId}`
    )
    expect(mockLogger.log).toBeCalledWith(
      `Total evaluatorNotes: ${evaluatorNotes.length}`
    )
    expect(mockEvaluatorNoteRepository.find).toHaveBeenCalledWith({
      where: {
        people_id: mockPeopleId
      },
      relations: ['evidenceId']
    })
    expect(evaluatorNotes).toHaveLength(1)
    evaluatorNotes.forEach(evaluatorNote => {
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

  it('call updateRecordPeople when have array with two evaluatorNotes', async () => {
    const mockCalculateAverage = jest.spyOn(service, 'calulateAverage')
    const mockUpdateRecordPeopleAveragev= jest.spyOn(service, 'updateRecordPeopleAverage')
    jest.spyOn(mockEvaluatorNoteRepository, 'find').mockImplementation(() => Promise.resolve(mockEvaluatoNoteWithTwoRegisters))
    const mockEvaluatorNoteRequest = getMockUpdateEvaluatorNoteRequest({
      evaluatorId: mockEvaluatorId,
      evidenceId: mockEvidenceId,
      peopleId: mockPeopleId
    })
    jest.spyOn(mockEvaluatorNoteRepository, 'update').mockImplementation(() => Promise.resolve(mockUpdateResponse))

    const response = await service.updateEvaluatorNote(mockEvaluatorNoteRequest)
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Updating note: ${JSON.stringify(mockEvaluatorNoteRequest)}`
    )
    expect(mockEvaluatorNoteRepository.update).toHaveBeenCalledWith({
      evaluator_id: mockEvaluatorId,
      evidence_id: mockEvidenceId,
      people_id: mockPeopleId
    },
    {
      note: 1
    })
    expect(mockEvaluatorNoteRepository.find).toHaveBeenCalledWith({
      where: {
        people_id: mockPeopleId
      },
      relations: ['evidenceId']
    })
    expect(mockCalculateAverage).toHaveBeenCalledWith(mockEvaluatoNoteWithTwoRegisters)
    expect(mockUpdateRecordPeopleAveragev).toHaveBeenCalledWith(mockPeopleId, mockEvidenceId, 1.5)
    expect(response).toMatchObject({
      affected: 2
    })
  })

  it('not call updateRecordPeople when have array with one evaluatorNotes', async () => {
    const mockCalculateAverage = jest.spyOn(service, 'calulateAverage')
    const mockUpdateRecordPeopleAveragev= jest.spyOn(service, 'updateRecordPeopleAverage')
    jest.spyOn(mockEvaluatorNoteRepository, 'find').mockImplementation(() => Promise.resolve([mockEvaluatorNote]))
    const mockEvaluatorNoteRequest = getMockUpdateEvaluatorNoteRequest({
      evaluatorId: mockEvaluatorId,
      evidenceId: mockEvidenceId,
      peopleId: mockPeopleId
    })
    jest.spyOn(mockEvaluatorNoteRepository, 'update').mockImplementation(() => Promise.resolve(mockUpdateResponse))

    const response = await service.updateEvaluatorNote(mockEvaluatorNoteRequest)
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Updating note: ${JSON.stringify(mockEvaluatorNoteRequest)}`
    )
    expect(mockEvaluatorNoteRepository.update).toHaveBeenCalledWith({
      evaluator_id: mockEvaluatorId,
      evidence_id: mockEvidenceId,
      people_id: mockPeopleId
    },
    {
      note: 1
    })
    expect(mockEvaluatorNoteRepository.find).toHaveBeenCalledWith({
      where: {
        people_id: mockPeopleId
      },
      relations: ['evidenceId']
    })
    expect(mockCalculateAverage).toHaveBeenCalledWith([mockEvaluatorNote])
    expect(mockUpdateRecordPeopleAveragev).not.toHaveBeenCalled()
    expect(response).toMatchObject({
      affected: 1
    })
  })

  it('should be update average to recordPeople', async () => {
    await service.updateRecordPeopleAverage(mockPeopleId, mockEvidenceId, 2)
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Updating record people average to peopleId: ${mockPeopleId}, evidenceId: ${mockEvidenceId}, average: 2`
    )
    expect(mockRecordPeopleService.updateRecordPeople).toHaveBeenCalledWith({
      peopleId: mockPeopleId, 
      evidenceId: mockEvidenceId, 
      average: 2
    })
  })

  it('should calculate average when have receive two evaluatorNotes', () => {
    const average = service.calulateAverage(mockEvaluatoNoteWithTwoRegisters)
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Calculate new average`
    )
    expect(average).toBe(1.5)
  })

  it('should not calculate average when have receive one evaluatorNotes', () => {
    const average = service.calulateAverage([mockEvaluatorNote])
    expect(mockLogger.log).not.toHaveBeenCalledWith(
      `Calculate new average`
    )
    expect(average).toBeUndefined()
  })
});
