import { getCustomRepository } from 'typeorm'
import { Evidence } from '../../common/entities/Evidences'
import { LoggerService } from '../../common/LoggerService'
import { EvidenceRepository } from '../../common/repositories/evidences.repository'

interface IEvidenceRepository {
    evidenceRepository?: EvidenceRepository,
    name: string,
    desc?: string
}

export class CreateEvidenceService {
    private evidenceRepository: EvidenceRepository
    private evidence: Evidence
    private logger: LoggerService = new LoggerService()

    constructor ({
      evidenceRepository = getCustomRepository(EvidenceRepository),
      name,
      desc
    }: IEvidenceRepository) {
      this.evidenceRepository = evidenceRepository
      this.evidence = new Evidence(name, desc)
    }

    async execute (): Promise<Evidence> {
      this.logger.trace(
        'Creating evidence',
        this.constructor.name
      )
      return await this.evidenceRepository.save(this.evidence)
    }
}
