import { randomUUID } from 'crypto'
import { Skill } from '../common/entities/Skills'
import { randomString } from '../common/randomString'

export const getMockSkill = (): Skill => ({
  skill_id: randomUUID().toString(),
  name: randomString(),
  desc: 'Some description'
})
