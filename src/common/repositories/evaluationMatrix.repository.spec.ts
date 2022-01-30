import getManagerMock from '../../__mocks__/getEntityManagerMock'
import { getMockEvaluationMatrix } from '../../__mocks__/mockEvaluationMatrix'
import { EvaluationMatrixRepository } from './evaluationMatrix.repository'

describe('EvaluationMatrixRepository', () => {
  const evaluationMatrixMock = getMockEvaluationMatrix()

  it('should call getMain method and return evaluationMatrix array', async () => {
    const managerMock = await getManagerMock({
      findReturn: [evaluationMatrixMock]
    })

    const evaluationMatrixRepository = new EvaluationMatrixRepository(managerMock)

    const matrix = await evaluationMatrixRepository.getMain()
    expect(matrix).toMatchObject([evaluationMatrixMock])
  })
})
