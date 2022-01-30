import { getCustomRepository } from 'typeorm'
import { Evidence } from '../../common/entities/Evidences'
import { LoggerService } from '../../common/LoggerService'
import { EvidenceRepository } from '../../common/repositories/evidences.repository'

export class GetAllEvidenceService {
    private evidencesRepository: EvidenceRepository
    private logger: LoggerService = new LoggerService()

    constructor (
      evidenceRepository: EvidenceRepository = getCustomRepository(EvidenceRepository)) {
      this.evidencesRepository = evidenceRepository
    }

    async execute (): Promise<Evidence[]> {
      this.logger.trace(
        'Getting evidences',
        this.constructor.name
      )
      return await this.evidencesRepository.getAll()
    }
}
