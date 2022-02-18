import { Request } from 'express'
import { getMockMappingNote } from '../../__mocks__/mockMappingNote'
import { makeMockResponse } from '../../__mocks__/mockResponse'
import { UpdateMappingNoteController } from './updateMappingNote.controller'

let mockExecute = jest.fn()

jest.mock('../services/updateMappingNote.service', () => {
  return {
    UpdateMappingNoteService: jest.fn().mockImplementation(() => {
      return {
        execute: mockExecute
      }
    })
  }
})

describe('UpdateMappingNoteController', () => {
  const mappingNoteMock = getMockMappingNote()

  const updateMappingNoteController = new UpdateMappingNoteController()

  const request = {
    body: {
      mappingId: mappingNoteMock.mapping_id
    }
  } as Request

  const response = makeMockResponse()

  it('should return a number of rows updated', async () => {
    mockExecute = jest.fn().mockResolvedValue({
      affected: 1
    })

    await updateMappingNoteController.handle(request, response)

    expect(mockExecute).toBeCalled()
    expect(response.state.status).toBe(200)
    expect(response.state.json).toMatchObject({
      affected: 1
    })
  })

  it('should return status 400 when mappingId is empty', async () => {
    const request = {
      body: {
        mappingId: ''
      }
    } as Request

    await updateMappingNoteController.handle(request, response)
    expect(response.state.status).toBe(400)
  })

  it('should return status 500 when have server error', async () => {
    mockExecute = jest.fn().mockImplementation(() => {
      throw new Error()
    })

    await updateMappingNoteController.handle(request, response)
    expect(response.state.status).toBe(500)
  })
})
