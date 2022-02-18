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

    const evaluationMatrix = await evaluationMatrixRepository.getMain()
    expect(evaluationMatrix).toMatchObject([evaluationMatrixMock])
  })

  it('should return evaluationMatrix array with values of skill', async () => {
    const managerMock = await getManagerMock({
      findReturn: [evaluationMatrixMock]
    })

    const evaluationMatrixRepository = new EvaluationMatrixRepository(managerMock)

    const evaluationMatrix = await evaluationMatrixRepository.getWeightSkill()
    expect(evaluationMatrix).toMatchObject([evaluationMatrixMock])
  })
})
