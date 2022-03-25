import { getMockMappingNote } from '../../__mocks__/mockMappingNote'
import { makeMockResponse } from '../../__mocks__/mockResponse'
import { makeMockRequest } from '../../__mocks__/mockRequest'
import { MappingNoteController } from './mappingNote.controller'
import { getMockMapping } from '../../__mocks__/mockMapping'

let mockgetMapping = jest.fn()
let mockExecute = jest.fn()

jest.mock('../services/mapping.service', () => {
  return {
    MappingService: jest.fn().mockImplementation(() => {
      return {
        getMappingByPeopleId: mockgetMapping
      }
    })
  }
})

jest.mock('../services/getMappingNote.service', () => {
  return {
    GetMappingNoteService: jest.fn().mockImplementation(() => {
      return {
        execute: mockExecute
      }
    })
  }
})

describe('MappingNoteController', () => {
  const mappingNoteMock = getMockMappingNote()
  const mappingMock = getMockMapping()

  const mappingNoteController = new MappingNoteController()

  const request = makeMockRequest({
    params: {
      peopleId: mappingMock.people_id
    }
  })

  const response = makeMockResponse()

  it('should return a number of rows updated', async () => {
    mockgetMapping = jest.fn().mockResolvedValue(mappingMock)
    mockExecute = jest.fn().mockResolvedValue(mappingNoteMock)

    await mappingNoteController.getMapping(request, response)

    expect(mockgetMapping).toBeCalled()
    expect(response.state.status).toBe(200)
    expect(response.state.json).toMatchObject({
      mapping: mappingMock,
      mappingNotes: mappingNoteMock
    })
  })
  it('should return status 500 when have server error', async () => {
    mockgetMapping = jest.fn().mockRejectedValue(new Error())

    await mappingNoteController.getMapping(request, response)
    expect(response.state.status).toBe(500)
  })
})
