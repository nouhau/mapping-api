import mockConnection from '../../__mocks__/mockConnection'
import { getMockMatrix } from '../../__mocks__/mockMatrix'
import { GetAllMatrixService } from './getAllMatrix.service'

jest.mock('../../common/repositories/matrix.repository')

const matrixMockRepository = require('../../common/repositories/matrix.repository')
const getAllMatrixService = new GetAllMatrixService(matrixMockRepository)

describe('GetAllMatrix', () => {
  const matrixMock = getMockMatrix()
  const otherMatrixMock = getMockMatrix()

  beforeEach(async () => {
    await mockConnection.create()
  })

  afterEach(async () => {
    await mockConnection.clear()
  })

  it('get all evidences', async () => {
    matrixMockRepository.getAll = jest.fn()
      .mockImplementation(() => Promise.resolve([matrixMock, otherMatrixMock]))

    const matrix = await getAllMatrixService.execute()
    expect(matrix).toMatchObject([matrixMock, otherMatrixMock])
  })
})
