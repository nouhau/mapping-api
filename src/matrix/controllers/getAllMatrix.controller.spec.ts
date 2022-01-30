import { getMockMatrix } from '../../__mocks__/mockMatrix'
import { makeMockRequest } from '../../__mocks__/mockRequest'
import { makeMockResponse } from '../../__mocks__/mockResponse'
import { GetAllMatrixController } from './getAllMatrix.controller'

let mockExecute = jest.fn()

jest.mock('../services/getAllMatrix.service', () => {
  return {
    GetAllMatrixService: jest.fn().mockImplementation(() => {
      return {
        execute: mockExecute
      }
    })
  }
})

describe('GetAllMatrix', () => {
  const getAllMatrixController = new GetAllMatrixController()
  const request = makeMockRequest({})
  const response = makeMockResponse()

  it('Should return status 200 and a empty array when does not have matrix', async () => {
    mockExecute = jest.fn().mockResolvedValue([])

    await getAllMatrixController.handle(request, response)

    expect(mockExecute).toBeCalled()
    expect(response.state.status).toBe(200)
    expect(response.state.json).toMatchObject([])
  })

  it('Should return status 200 and and all matrix in database', async () => {
    const matrixMock = getMockMatrix()
    const otherMatrixMock = getMockMatrix()

    mockExecute = jest.fn().mockResolvedValue([matrixMock, otherMatrixMock])

    await getAllMatrixController.handle(request, response)

    expect(mockExecute).toBeCalled()
    expect(response.state.status).toBe(200)
    expect(response.state.json).toMatchObject([matrixMock, otherMatrixMock])
  })

  it('Should return error wher server fails', async () => {
    mockExecute = jest.fn().mockImplementation(() => {
      throw new Error()
    })

    await expect(getAllMatrixController.handle(request, response))
      .rejects.toThrowError()
  })
})
