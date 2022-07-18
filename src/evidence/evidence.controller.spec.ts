import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Evidence } from '../common/entities/Evidence';
import { getMockEvidenceRequest } from '../__mocks__/mockEvidenceRequest';
import { EvidenceController } from './evidence.controller';
import { EvidenceService } from './service/evidence.service';

describe('EvidenceController', () => {
  let controller: EvidenceController;
  let mockLogger: Logger;
  let mockEvidenceService: EvidenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvidenceController],
      providers: [
        EvidenceService,
        {
          provide: getRepositoryToken(Evidence),
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

    controller = module.get<EvidenceController>(EvidenceController);
    mockLogger = module.get<Logger>(Logger);
    mockEvidenceService = module.get<EvidenceService>(EvidenceService);
  });

  it('should return a new evidence', async () => {
    const mockEvidenceRequest = getMockEvidenceRequest()
    const mockEvidenceReturn = {
      ...mockEvidenceRequest,
      evidence_id: randomUUID().toString()
    }

    jest.spyOn(mockEvidenceService, 'createEvidence').mockImplementation(()=> Promise.resolve(mockEvidenceReturn))

    const response = await controller.createEvidence(mockEvidenceRequest)
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Request received with with evidence: ${mockEvidenceRequest.name}`
    )
    expect(response.evidence_id).toBeDefined()
    expect(response).toMatchObject({
      name: 'string',
      desc: 'desc string'
    })
  });

  it('should return all evidences', async () => {
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

    jest.spyOn(mockEvidenceService, 'getAllEvidence').mockImplementation(() => Promise.resolve(mockEvidenceReturn))

    const evidences = await controller.getAllEvidence()
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Getting all evidences`
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
