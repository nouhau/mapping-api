import { getMockEvaluatorNote } from '../../__mocks__/mockEvaluatorNote'
import { makeMockRequest } from '../../__mocks__/mockRequest'
import { makeMockResponse } from '../../__mocks__/mockResponse'
import { EvaluatorNoteController } from './evaluatorNote.controller'

let mockGetEvaluatorNoteByPeopleId = jest.fn()

jest.mock('../services/evaluatorNote.service', () => {
  return {
    EvaluatorNoteService: jest.fn().mockImplementation(() => {
      return {
        getEvaluatorNoteByPeopleId: mockGetEvaluatorNoteByPeopleId
      }
    })
  }
})

describe('EvaluatorNoteController', () => {
  const evaluatorNoteMock = getMockEvaluatorNote()

  const evaluatorNoteController = new EvaluatorNoteController()

  const request = makeMockRequest({
    params: {
      peopleId: evaluatorNoteMock.people_id
    }
  })

  const response = makeMockResponse()

  it('should return a array with evaluator notes', async () => {
    mockGetEvaluatorNoteByPeopleId = jest.fn().mockResolvedValue([evaluatorNoteMock])

    await evaluatorNoteController.getEvaluatorNoteByPeopleId(request, response)

    expect(mockGetEvaluatorNoteByPeopleId).toBeCalled()
    expect(response.state.status).toBe(200)
    expect(response.state.json).toMatchObject({
      notes: [evaluatorNoteMock]
    })
  })

  it('should return status 500 when have server error', async () => {
    mockGetEvaluatorNoteByPeopleId = jest.fn().mockImplementation(() => {
      throw new Error()
    })

    await evaluatorNoteController.getEvaluatorNoteByPeopleId(request, response)
    expect(response.state.status).toBe(500)
  })
})
