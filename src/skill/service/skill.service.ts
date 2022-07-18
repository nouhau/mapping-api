import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from '../../common/entities/Skill';
import { Repository } from 'typeorm';
import { SkillRequest } from '../dto/skillRequest.dto';

@Injectable()
export class SkillService {

  constructor(
    private readonly logger: Logger = new Logger(SkillService.name),
    @InjectRepository(Skill) private skillRepository: Repository<Skill>
  ) {}

  createSkill = async (skillRequest: SkillRequest): Promise<Skill> => {
    this.logger.log(
      `Creating skill: ${skillRequest.name}`
    )

    const newSkill: Skill = new Skill(skillRequest.name, skillRequest.desc)

    const skill: Skill = await this.skillRepository.save(newSkill)

    this.logger.log(
      `Skill created ${skill.skill_id}`
    )

    return skill
  }

  getAllSkill = async (): Promise<Skill[]> => {
    this.logger.log(
      `Getting skills`
    )

    const skills: Skill[] = await this.skillRepository.find()

    this.logger.log(
      `Get ${skills.length} skills`
    )

    return skills
  }
}
