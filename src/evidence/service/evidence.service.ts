import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Evidence } from '../../common/entities/Evidence';
import { Repository } from 'typeorm';
import { EvidenceRequest } from '../dto/evidenceRequest.dto';

@Injectable()
export class EvidenceService {

  constructor(
    private readonly logger: Logger = new Logger(EvidenceService.name),
    @InjectRepository(Evidence) private evidenceRepository: Repository<Evidence>
  ) {}
  
  createEvidence = async (evidenceRequest: EvidenceRequest): Promise<Evidence> => {
    this.logger.log(
      `Creating skill: ${evidenceRequest.name}`
    )

    const newEvidence: Evidence = new Evidence(evidenceRequest.name, evidenceRequest.desc)

    const evidence: Evidence = await this.evidenceRepository.save(newEvidence)

    this.logger.log(
      `Evidence created ${evidence.evidence_id}`
    )

    return evidence
  }

  getAllEvidence = async (): Promise<Evidence[]> => {
    this.logger.log(
      `Getting evidences`
    )

    const evidences: Evidence[] = await this.evidenceRepository.find()

    this.logger.log(
      `Get ${evidences.length} evidences`
    )

    return evidences
  }
}
