import { getMockRecordPeople } from '../../__mocks__/mockRecordPeople'
import { makeMockRequest } from '../../__mocks__/mockRequest'
import { makeMockResponse } from '../../__mocks__/mockResponse'
import { GetRecordPeopleController } from './getRecordPeople.controller'

let mockExecute = jest.fn()

jest.mock('../services/getRecordPeople.service', () => {
  return {
    GetRecordPeopleService: jest.fn().mockImplementation(() => {
      return {
        execute: mockExecute
      }
    })
  }
})

describe('GetRecordPeople', () => {
  const getRecordPeopleController = new GetRecordPeopleController()
  const request = makeMockRequest({})
  const response = makeMockResponse()

  it('Should return status 200 and a empty array when does not have records', async () => {
    mockExecute = jest.fn().mockResolvedValue([])

    await getRecordPeopleController.handle(request, response)

    expect(mockExecute).toBeCalled()
    expect(response.state.status).toBe(200)
    expect(response.state.json).toMatchObject([])
  })

  it('Should return status 200 and and records in database', async () => {
    const recordPeopleMock = getMockRecordPeople()

    mockExecute = jest.fn().mockResolvedValue([recordPeopleMock])

    await getRecordPeopleController.handle(request, response)

    expect(mockExecute).toBeCalled()
    expect(response.state.status).toBe(200)
    expect(response.state.json).toMatchObject([recordPeopleMock])
  })

  it('Should return error wher server fails', async () => {
    mockExecute = jest.fn().mockImplementation(() => {
      throw new Error()
    })

    await expect(getRecordPeopleController.handle(request, response))
      .rejects.toThrowError()
  })
})
