import { getMockEvaluationMatrix } from '../../__mocks__/mockEvaluationMatrix'
import { makeMockRequest } from '../../__mocks__/mockRequest'
import { makeMockResponse } from '../../__mocks__/mockResponse'
import { GetEvaluationMatrixController } from './getEvaluationMatrix.controller'

let mockExecute = jest.fn()

jest.mock('../services/getEvaluationMatrix.service', () => {
  return {
    GetEvaluationMatrixService: jest.fn().mockImplementation(() => {
      return {
        execute: mockExecute
      }
    })
  }
})

describe('GetEvaluationMatrix', () => {
  const getEvaluationMatrixController = new GetEvaluationMatrixController()
  const request = makeMockRequest({})
  const response = makeMockResponse()

  it('Should return status 200 and a empty array when does not have evaluation matrix', async () => {
    mockExecute = jest.fn().mockResolvedValue([])

    await getEvaluationMatrixController.handle(request, response)

    expect(mockExecute).toBeCalled()
    expect(response.state.status).toBe(200)
    expect(response.state.json).toMatchObject([])
  })

  it('Should return status 200 and and evaluation matrix in database', async () => {
    const evaluationMatrixMock = getMockEvaluationMatrix()

    mockExecute = jest.fn().mockResolvedValue([evaluationMatrixMock])

    await getEvaluationMatrixController.handle(request, response)

    expect(mockExecute).toBeCalled()
    expect(response.state.status).toBe(200)
    expect(response.state.json).toMatchObject([evaluationMatrixMock])
  })

  it('Should return error wher server fails', async () => {
    mockExecute = jest.fn().mockImplementation(() => {
      throw new Error()
    })

    await expect(getEvaluationMatrixController.handle(request, response))
      .rejects.toThrowError()
  })
})
