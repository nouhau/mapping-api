import mockConnection from '../../__mocks__/mockConnection'
import { getMockSkill } from '../../__mocks__/mockSkill'
import { GetAllSkillService } from './getAllSkill.service'

jest.mock('../../common/repositories/skills.repository')

const skillMockRepository = require('../../common/repositories/skills.repository')
const getAllSkillService = new GetAllSkillService(skillMockRepository)

describe('GetAllSkill', () => {
  const skillMock = getMockSkill()
  const otherSkillMock = getMockSkill()

  beforeEach(async () => {
    await mockConnection.create()
  })

  afterEach(async () => {
    await mockConnection.clear()
  })

  it('get all skills', async () => {
    skillMockRepository.getAll = jest.fn()
      .mockImplementation(() => Promise.resolve([skillMock, otherSkillMock]))

    const skills = await getAllSkillService.execute()
    expect(skills).toMatchObject([skillMock, otherSkillMock])
  })
})
