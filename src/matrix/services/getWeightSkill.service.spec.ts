import mockConnection from '../../__mocks__/mockConnection'
import { getMockEvaluationMatrix } from '../../__mocks__/mockEvaluationMatrix'
import { GetWeightSkillService } from './getWeightSkill.service'

jest.mock('../../common/repositories/evaluationMatrix.repository')

const evaluationMatrixMockRepository = require('../../common/repositories/evaluationMatrix.repository')
const getWeightSkillService = new GetWeightSkillService(evaluationMatrixMockRepository)

describe('GetWeightSkillService', () => {
  const evaluationMatrixMock = getMockEvaluationMatrix()

  beforeEach(async () => {
    await mockConnection.create()
  })

  afterEach(async () => {
    await mockConnection.clear()
  })

  it('get skills with weight', async () => {
    evaluationMatrixMockRepository.getWeightSkill = jest.fn()
      .mockImplementation(() => Promise.resolve([evaluationMatrixMock]))

    const evaluationMatrix = await getWeightSkillService.execute()
    expect(evaluationMatrix).toMatchObject([evaluationMatrixMock])
  })
})
