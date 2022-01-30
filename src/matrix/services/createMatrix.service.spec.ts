import { getConnection } from 'typeorm'
import createConnection from '../../config/database'
import { getMockMatrix } from '../../__mocks__/mockMatrix'
import { CreateMatrixService } from './createMatrix.service'

jest.mock('../../common/repositories/matrix.repository')

const matrixMockRepository = require('../../common/repositories/matrix.repository')

describe('CreateMatrixService', () => {
  let createMatrixService

  const matrixMock = getMockMatrix()

  beforeEach(async () => {
    await createConnection()
    createMatrixService = new CreateMatrixService({
      matrixRepository: matrixMockRepository,
      name: matrixMock.name,
      desc: matrixMock.desc
    })
  })

  afterEach(async () => {
    const connection = getConnection()
    await connection.close()
  })

  it('Create and return a new matrix created', async () => {
    matrixMockRepository.save = jest.fn()
      .mockImplementation(() => Promise.resolve(matrixMock))

    const matrix = await createMatrixService.execute()

    expect(matrixMockRepository.save).toHaveBeenCalled()
    expect(matrix).toMatchObject(matrixMock)
  })
})
