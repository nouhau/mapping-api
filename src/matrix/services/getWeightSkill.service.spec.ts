import mockConnection from '../../__mocks__/mockConnection'
import { getMockEvaluationMatrix } from '../../__mocks__/mockEvaluationMatrix'
import { GetWeightSkillService } from './getWeightSkill.service'

jest.mock('../../common/repositories/evaluationMatrix.repository')

const evaluationMatrixMockRepository = require('../../common/repositories/evaluationMatrix.repository')

describe('GetWeightSkillService', () => {
  const evaluationMatrixMock = getMockEvaluationMatrix()

  const getWeightSkillService = new GetWeightSkillService(evaluationMatrixMockRepository)

  beforeEach(async () => {
    await mockConnection.create()
  })

  afterEach(async () => {
    await mockConnection.clear()
  })

  it('get skills with weight', async () => {
    evaluationMatrixMockRepository.getWeightSkill = jest.fn()
      .mockImplementation(() => Promise.resolve([evaluationMatrixMock]))

    const evaluationMatrix = await getWeightSkillService.execute(evaluationMatrixMock.skill_id, evaluationMatrixMock.matrix_id)
    expect(evaluationMatrix).toMatchObject([evaluationMatrixMock])
  })
})
