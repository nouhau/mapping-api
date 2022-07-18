import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { EvidenceService } from './evidence.service';
import { Evidence } from '../../common/entities/Evidence';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getMockEvidenceRequest } from '../../__mocks__/mockEvidenceRequest';
import { randomUUID } from 'crypto';

describe('EvidenceService', () => {
  let service: EvidenceService;
  let mockLogger: Logger;
  let mockEvidenceRepository: Repository<Evidence>

  const EVIDENCE_REPOSITORY_TOKEN = getRepositoryToken(Evidence)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvidenceService,
        {
          provide: EVIDENCE_REPOSITORY_TOKEN,
          useValue: {
            save: jest.fn(),
            find: jest.fn()
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

    service = module.get<EvidenceService>(EvidenceService);
    mockLogger = module.get<Logger>(Logger)
    mockEvidenceRepository = module.get<Repository<Evidence>>(EVIDENCE_REPOSITORY_TOKEN)
  });

  it('should return a new evidence', async () => {
    const mockEvidenceRequest = getMockEvidenceRequest()
    const mockEvidenceReturn = {
      ...mockEvidenceRequest,
      evidence_id: randomUUID().toString()
    }

    jest.spyOn(mockEvidenceRepository, 'save').mockImplementation(() => Promise.resolve(mockEvidenceReturn))
    const evidence = await service.createEvidence(mockEvidenceRequest)
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Creating skill: ${mockEvidenceRequest.name}`
    )
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Evidence created ${mockEvidenceReturn.evidence_id}`
    )
    expect(evidence.evidence_id).toBeDefined()
    expect(evidence).toMatchObject({
      name: 'string',
      desc: 'desc string'
    })
  });

  it('should return a array with all evidences', async () => {
    const mockEvidenceReturn = [
      {
        ...getMockEvidenceRequest(),
        evidence_id: randomUUID().toString()
      },
      {
        ...getMockEvidenceRequest('another', 'desc'),
        evidence_id: randomUUID().toString()
      }
    ]

    jest.spyOn(mockEvidenceRepository, 'find').mockImplementation(() => Promise.resolve(mockEvidenceReturn))

    const evidences = await service.getAllEvidence()
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Getting evidences`
    )
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Get ${evidences.length} evidences`
    )
    evidences.forEach(evidence => expect(evidence.evidence_id).toBeDefined())  
    expect(evidences).toMatchObject([
      {
        name: 'string',
        desc: 'desc string'
      },
      {
        name: 'another',
        desc: 'desc'
      }
    ])
  })
});
