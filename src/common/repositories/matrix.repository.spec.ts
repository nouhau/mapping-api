import getManagerMock from '../../__mocks__/getEntityManagerMock'
import { getMockMatrix } from '../../__mocks__/mockMatrix'
import { MatrixRepository } from './matrix.repository'

describe('MatrixRepository', () => {
  const matrixMock = getMockMatrix()
  const otherMatrixMock = getMockMatrix()

  it('should call getAll method and return matrix array', async () => {
    const managerMock = await getManagerMock({
      findReturn: [matrixMock, otherMatrixMock]
    })

    const matrixRepository = new MatrixRepository(managerMock)

    const matrix = await matrixRepository.getAll()
    expect(matrix).toMatchObject([matrixMock, otherMatrixMock])
  })

  it('should call save method and return matrix created', async () => {
    const managerMock = await getManagerMock({
      saveReturn: matrixMock
    })

    const matrixRepository = new MatrixRepository(managerMock)

    const matrix = await matrixRepository.save(matrixMock)
    expect(matrix).toMatchObject(matrixMock)
  })
})
