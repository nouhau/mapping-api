import { getConnection } from 'typeorm'
import createConnection from '../../config/database'
import { getMockEvaluationMatrix } from '../../__mocks__/mockEvaluationMatrix'
import { GetEvaluationMatrixService } from './getEvaluationMatrix.service'

jest.mock('../../common/repositories/evaluationMatrix.repository')

const evaluationMatrixMockRepository = require('../../common/repositories/evaluationMatrix.repository')
const getEvaluationMatrixService = new GetEvaluationMatrixService(evaluationMatrixMockRepository)

describe('GetEvaluationMatrix', () => {
  const evaluationMatrixMock = getMockEvaluationMatrix()

  beforeEach(async () => {
    await createConnection()
  })

  afterEach(async () => {
    const connection = getConnection()
    await connection.close()
  })

  it('get main evaluation matrix', async () => {
    evaluationMatrixMockRepository.getMain = jest.fn()
      .mockImplementation(() => Promise.resolve([evaluationMatrixMock]))

    const evaluationMatrix = await getEvaluationMatrixService.execute()
    expect(evaluationMatrix).toMatchObject([evaluationMatrixMock])
  })
})
