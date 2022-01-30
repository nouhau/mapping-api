import { getCustomRepository } from 'typeorm'
import { Skill } from '../../common/entities/Skills'
import { LoggerService } from '../../common/LoggerService'
import { SkillRepository } from '../../common/repositories/skills.repository'

interface ISkillRepository {
    skillRepository?: SkillRepository,
    name: string,
    desc?: string
}

export class CreateSkillService {
    private skillRepository: SkillRepository
    private skill: Skill
    private logger: LoggerService = new LoggerService()

    constructor ({
      skillRepository = getCustomRepository(SkillRepository),
      name,
      desc
    }: ISkillRepository) {
      this.skillRepository = skillRepository
      this.skill = new Skill(name, desc)
    }

    async execute (): Promise<Skill> {
      this.logger.trace(
        'Creating evidence',
        this.constructor.name
      )

      return await this.skillRepository.save(this.skill)
    }
}
