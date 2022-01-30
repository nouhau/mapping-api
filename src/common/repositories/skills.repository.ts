import { EntityManager, EntityRepository } from 'typeorm'
import { Skill } from '../entities/Skills'

@EntityRepository(Skill)
export class SkillRepository {
    private manager: EntityManager;

    constructor (manager: EntityManager) {
      this.manager = manager
    }

    getAll = async (): Promise<Skill[]> => {
      return await this.manager.find(Skill)
    }

    save = async (skill: Skill): Promise<Skill> => {
      return await this.manager.save(skill)
    }
}
