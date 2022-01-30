import { getMockEvidence } from '../../__mocks__/mockEvidence'
import { makeMockRequest } from '../../__mocks__/mockRequest'
import { makeMockResponse } from '../../__mocks__/mockResponse'
import { GetAllEvidenceController } from './getAllEvidence.controller'

let mockExecute = jest.fn()

jest.mock('../services/getAllEvidence.service', () => {
  return {
    GetAllEvidenceService: jest.fn().mockImplementation(() => {
      return {
        execute: mockExecute
      }
    })
  }
})

describe('GetAllEvidence', () => {
  const getAllEvidenceController = new GetAllEvidenceController()
  const request = makeMockRequest({})
  const response = makeMockResponse()
  it('Should return status 200 and a empty array when does not have evidences', async () => {
    mockExecute = jest.fn().mockResolvedValue([])

    await getAllEvidenceController.handle(request, response)

    expect(mockExecute).toBeCalled()
    expect(response.state.status).toBe(200)
    expect(response.state.json).toMatchObject([])
  })

  it('Should return status 200 and and all evidences in database', async () => {
    const evidenceMock = getMockEvidence()
    const otherEvidenceMock = getMockEvidence()

    mockExecute = jest.fn().mockResolvedValue([evidenceMock, otherEvidenceMock])

    await getAllEvidenceController.handle(request, response)

    expect(mockExecute).toBeCalled()
    expect(response.state.status).toBe(200)
    expect(response.state.json).toMatchObject([evidenceMock, otherEvidenceMock])
  })

  it('Should return error wher server fails', async () => {
    mockExecute = jest.fn().mockImplementation(() => {
      throw new Error()
    })

    await expect(getAllEvidenceController.handle(request, response))
      .rejects.toThrowError()
  })
})
