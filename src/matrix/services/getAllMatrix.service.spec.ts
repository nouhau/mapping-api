import { getConnection } from 'typeorm'
import createConnection from '../../config/database'
import { getMockMatrix } from '../../__mocks__/mockMatrix'
import { GetAllMatrixService } from './getAllMatrix.service'

jest.mock('../../common/repositories/matrix.repository')

const matrixMockRepository = require('../../common/repositories/matrix.repository')
const getAllMatrixService = new GetAllMatrixService(matrixMockRepository)

describe('GetAllMatrix', () => {
  const matrixMock = getMockMatrix()
  const otherMatrixMock = getMockMatrix()

  beforeEach(async () => {
    await createConnection()
  })

  afterEach(async () => {
    const connection = getConnection()
    await connection.close()
  })

  it('get all evidences', async () => {
    matrixMockRepository.getAll = jest.fn()
      .mockImplementation(() => Promise.resolve([matrixMock, otherMatrixMock]))

    const matrix = await getAllMatrixService.execute()
    expect(matrix).toMatchObject([matrixMock, otherMatrixMock])
  })
})
