import { Request } from 'express'
import { getMockSkill } from '../../__mocks__/mockSkill'
import { makeMockResponse } from '../../__mocks__/mockResponse'
import { CreateSkillController } from './createSkill.controller'

let mockExecute = jest.fn()

jest.mock('../services/createSkill.service', () => {
  return {
    CreateSkillService: jest.fn().mockImplementation(() => {
      return {
        execute: mockExecute
      }
    })
  }
})

describe('CreateSkillController', () => {
  const skillMock = getMockSkill()

  const createSkillController = new CreateSkillController()

  const request = {
    body: {
      name: skillMock.name,
      desc: skillMock.desc
    }
  } as Request

  const response = makeMockResponse()

  it('should return a skill when created', async () => {
    mockExecute = jest.fn().mockResolvedValue(skillMock)

    await createSkillController.handle(request, response)

    expect(mockExecute).toBeCalled()
    expect(response.state.status).toBe(200)
    expect(response.state.json).toMatchObject(skillMock)
  })

  it('should return status 500 when have server error', async () => {
    mockExecute = jest.fn().mockImplementation(() => {
      throw new Error()
    })

    await expect(createSkillController.handle(request, response))
      .rejects.toThrowError()
  })
})
