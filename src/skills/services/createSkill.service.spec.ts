import { getConnection } from 'typeorm'
import createConnection from '../../config/database'
import { getMockSkill } from '../../__mocks__/mockSkill'
import { CreateSkillService } from './createSkill.service'

jest.mock('../../common/repositories/skills.repository')

const skillMockRepository = require('../../common/repositories/skills.repository')

describe('CreateSkillervice', () => {
  let createSkillService

  const skillMock = getMockSkill()

  beforeEach(async () => {
    await createConnection()
    createSkillService = new CreateSkillService({
      skillRepository: skillMockRepository,
      name: skillMock.name,
      desc: skillMock.desc
    })
  })

  afterEach(async () => {
    const connection = getConnection()
    await connection.close()
  })

  it('Create and return a new skill created', async () => {
    skillMockRepository.save = jest.fn()
      .mockImplementation(() => Promise.resolve(skillMock))

    const skill = await createSkillService.execute()

    expect(skillMockRepository.save).toHaveBeenCalled()
    expect(skill).toMatchObject(skillMock)
  })
})
