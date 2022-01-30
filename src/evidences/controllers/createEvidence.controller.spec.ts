import { Request } from 'express'
import { getMockEvidence } from '../../__mocks__/mockEvidence'
import { makeMockResponse } from '../../__mocks__/mockResponse'
import { CreateEvidenceController } from './createEvidence.controller'

let mockExecute = jest.fn()

jest.mock('../services/createEvidence.service', () => {
  return {
    CreateEvidenceService: jest.fn().mockImplementation(() => {
      return {
        execute: mockExecute
      }
    })
  }
})

describe('CreateEvidenceController', () => {
  const evidenceMock = getMockEvidence()

  const createEvidenceController = new CreateEvidenceController()

  const request = {
    body: {
      name: evidenceMock.name,
      desc: evidenceMock.desc
    }
  } as Request

  const response = makeMockResponse()

  it('should return a evidence when created', async () => {
    mockExecute = jest.fn().mockResolvedValue(evidenceMock)

    await createEvidenceController.handle(request, response)

    expect(mockExecute).toBeCalled()
    expect(response.state.status).toBe(200)
    expect(response.state.json).toMatchObject(evidenceMock)
  })

  it('should return status 500 when have server error', async () => {
    mockExecute = jest.fn().mockImplementation(() => {
      throw new Error()
    })

    await expect(createEvidenceController.handle(request, response))
      .rejects.toThrowError()
  })
})
