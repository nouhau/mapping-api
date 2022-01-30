import { Request } from 'express'
import { getMockMatrix } from '../../__mocks__/mockMatrix'
import { makeMockResponse } from '../../__mocks__/mockResponse'
import { CreateMatrixController } from './createMatrix.controller'

let mockExecute = jest.fn()

jest.mock('../services/createMatrix.service', () => {
  return {
    CreateMatrixService: jest.fn().mockImplementation(() => {
      return {
        execute: mockExecute
      }
    })
  }
})

describe('CreateMatrixController', () => {
  const matrixMock = getMockMatrix()

  const createMatrixController = new CreateMatrixController()

  const request = {
    body: {
      name: matrixMock.name,
      desc: matrixMock.desc
    }
  } as Request

  const response = makeMockResponse()

  it('should return a matrix when created', async () => {
    mockExecute = jest.fn().mockResolvedValue(matrixMock)

    await createMatrixController.handle(request, response)

    expect(mockExecute).toBeCalled()
    expect(response.state.status).toBe(200)
    expect(response.state.json).toMatchObject(matrixMock)
  })

  it('should return status 500 when have server error', async () => {
    mockExecute = jest.fn().mockImplementation(() => {
      throw new Error()
    })

    await expect(createMatrixController.handle(request, response))
      .rejects.toThrowError()
  })
})
