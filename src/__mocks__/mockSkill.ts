import { v4 as uuid } from 'uuid'
import { Skill } from '../common/entities/Skills'
import { randomString } from '../common/randomString'

export const getMockSkill = (): Skill => ({
  skill_id: uuid(),
  name: randomString(),
  desc: 'Some description'
})
