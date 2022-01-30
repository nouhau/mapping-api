import getManagerMock from '../../__mocks__/getEntityManagerMock'
import { getMockSkill } from '../../__mocks__/mockSkill'
import { SkillRepository } from './skills.repository'

describe('SkillRepository', () => {
  const skillMock = getMockSkill()
  const otherSkillMock = getMockSkill()

  it('should call getAll method and return evidences array', async () => {
    const managerMock = await getManagerMock({
      findReturn: [skillMock, otherSkillMock]
    })

    const skillRepository = new SkillRepository(managerMock)

    const skills = await skillRepository.getAll()
    expect(skills).toMatchObject([skillMock, otherSkillMock])
  })

  it('should call save method and return evidence created', async () => {
    const managerMock = await getManagerMock({
      saveReturn: skillMock
    })

    const skillRepository = new SkillRepository(managerMock)

    const skill = await skillRepository.save(skillMock)
    expect(skill).toMatchObject(skillMock)
  })
})
