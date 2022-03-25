import { Request } from 'express'
import { getMockEvaluatorNote } from '../../__mocks__/mockEvaluatorNote'
import { makeMockResponse } from '../../__mocks__/mockResponse'
import { UpdateEvaluatorNoteController } from './updateEvaluatorNote.controller'

let mockExecute = jest.fn()

jest.mock('../services/updateEvaluatorNote.service', () => {
  return {
    UpdateEvaluatorNoteService: jest.fn().mockImplementation(() => {
      return {
        execute: mockExecute
      }
    })
  }
})

describe('UpdateEvaluatorNoteController', () => {
  const evaluatorNoteMock = getMockEvaluatorNote()

  const updateEvaluatorNoteController = new UpdateEvaluatorNoteController()

  const request = {
    body: {
      evaluatorId: evaluatorNoteMock.evaluator_id,
      peopleId: evaluatorNoteMock.people_id,
      notes: [
        {
          evidenceId: evaluatorNoteMock.evidence_id,
          note: evaluatorNoteMock.note
        }
      ]
    }
  } as Request

  const response = makeMockResponse()

  it('should return a number of rows updated', async () => {
    mockExecute = jest.fn().mockResolvedValue({
      affected: 1
    })

    await updateEvaluatorNoteController.handle(request, response)

    expect(mockExecute).toBeCalled()
    expect(response.state.status).toBe(200)
    expect(response.state.json).toMatchObject({
      affected: 1
    })
  })

  it('should return status 400 when name is empty', async () => {
    const request = {
      body: {
        evaluatorId: '',
        peopleId: evaluatorNoteMock.people_id,
        evidenceId: evaluatorNoteMock.evidence_id,
        note: evaluatorNoteMock.note
      }
    } as Request

    await updateEvaluatorNoteController.handle(request, response)
    expect(response.state.status).toBe(400)
  })

  it('should return status 500 when have server error', async () => {
    mockExecute = jest.fn().mockImplementation(() => {
      throw new Error()
    })

    await updateEvaluatorNoteController.handle(request, response)
    expect(response.state.status).toBe(500)
  })
})
