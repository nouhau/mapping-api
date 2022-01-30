import { getCustomRepository } from 'typeorm'
import { Skill } from '../../common/entities/Skills'
import { LoggerService } from '../../common/LoggerService'
import { SkillRepository } from '../../common/repositories/skills.repository'

export class GetAllSkillService {
    private skillsRepository: SkillRepository
    private logger: LoggerService = new LoggerService()

    constructor (
      skillRepository: SkillRepository = getCustomRepository(SkillRepository)) {
      this.skillsRepository = skillRepository
    }

    async execute (): Promise<Skill[]> {
      this.logger.trace(
        'Getting skills',
        this.constructor.name
      )
      return await this.skillsRepository.getAll()
    }
}
