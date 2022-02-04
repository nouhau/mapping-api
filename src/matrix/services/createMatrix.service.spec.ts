import mockConnection from '../../__mocks__/mockConnection'
import { getMockMatrix } from '../../__mocks__/mockMatrix'
import { CreateMatrixService } from './createMatrix.service'

jest.mock('../../common/repositories/matrix.repository')

const matrixMockRepository = require('../../common/repositories/matrix.repository')

describe('CreateMatrixService', () => {
  let createMatrixService

  const matrixMock = getMockMatrix()

  beforeEach(async () => {
    await mockConnection.create()
    createMatrixService = new CreateMatrixService({
      matrixRepository: matrixMockRepository,
      name: matrixMock.name,
      desc: matrixMock.desc
    })
  })

  afterEach(async () => {
    await mockConnection.clear()
  })

  it('Create and return a new matrix created', async () => {
    matrixMockRepository.save = jest.fn()
      .mockImplementation(() => Promise.resolve(matrixMock))

    const matrix = await createMatrixService.execute()

    expect(matrixMockRepository.save).toHaveBeenCalled()
    expect(matrix).toMatchObject(matrixMock)
  })
})
