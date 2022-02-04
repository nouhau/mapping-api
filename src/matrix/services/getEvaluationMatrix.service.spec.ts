import mockConnection from '../../__mocks__/mockConnection'
import { getMockEvaluationMatrix } from '../../__mocks__/mockEvaluationMatrix'
import { GetEvaluationMatrixService } from './getEvaluationMatrix.service'

jest.mock('../../common/repositories/evaluationMatrix.repository')

const evaluationMatrixMockRepository = require('../../common/repositories/evaluationMatrix.repository')
const getEvaluationMatrixService = new GetEvaluationMatrixService(evaluationMatrixMockRepository)

describe('GetEvaluationMatrix', () => {
  const evaluationMatrixMock = getMockEvaluationMatrix()

  beforeEach(async () => {
    await mockConnection.create()
  })

  afterEach(async () => {
    await mockConnection.clear()
  })

  it('get main evaluation matrix', async () => {
    evaluationMatrixMockRepository.getMain = jest.fn()
      .mockImplementation(() => Promise.resolve([evaluationMatrixMock]))

    const evaluationMatrix = await getEvaluationMatrixService.execute()
    expect(evaluationMatrix).toMatchObject([evaluationMatrixMock])
  })
})
