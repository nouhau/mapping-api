import { getMockSkill } from '../../__mocks__/mockSkill'
import { makeMockRequest } from '../../__mocks__/mockRequest'
import { makeMockResponse } from '../../__mocks__/mockResponse'
import { GetAllSkillController } from './getAllSkill.controller'

let mockExecute = jest.fn()

jest.mock('../services/getAllSkill.service', () => {
  return {
    GetAllSkillService: jest.fn().mockImplementation(() => {
      return {
        execute: mockExecute
      }
    })
  }
})

describe('GetAllSkill', () => {
  const getAllSkillController = new GetAllSkillController()
  const request = makeMockRequest({})
  const response = makeMockResponse()

  it('Should return status 200 and a empty array when does not have skills', async () => {
    mockExecute = jest.fn().mockResolvedValue([])

    await getAllSkillController.handle(request, response)

    expect(mockExecute).toBeCalled()
    expect(response.state.status).toBe(200)
    expect(response.state.json).toMatchObject([])
  })

  it('Should return status 200 and and all skills in database', async () => {
    const skillMock = getMockSkill()
    const otherSkillMock = getMockSkill()

    mockExecute = jest.fn().mockResolvedValue([skillMock, otherSkillMock])

    await getAllSkillController.handle(request, response)

    expect(mockExecute).toBeCalled()
    expect(response.state.status).toBe(200)
    expect(response.state.json).toMatchObject([skillMock, otherSkillMock])
  })

  it('Should return error wher server fails', async () => {
    mockExecute = jest.fn().mockImplementation(() => {
      throw new Error()
    })

    await expect(getAllSkillController.handle(request, response))
      .rejects.toThrowError()
  })
})
