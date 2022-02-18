import { GetWeightSkillService } from '../../matrix/services/getWeightSkill.service'
import { GetRecordPeopleService } from '../../recordPeople/services/getRecordPeople.service'
import mockConnection from '../../__mocks__/mockConnection'
import { getMockMappingNote } from '../../__mocks__/mockMappingNote'
import { getMockRecordPeople } from '../../__mocks__/mockRecordPeople'
import { getMockEvaluationMatrix } from '../../__mocks__/mockEvaluationMatrix'
import { GetMappingNoteService } from './getMappingNote.service'
import { UpdateMappingNoteService } from './updateMappingNote.service'

jest.mock('../../common/repositories/mappingNote.repository')

const mappingNoteMockRepository = require('../../common/repositories/mappingNote.repository')

describe('UpdateMappingNote', () => {
  let getMappingNoteServiceMock: Partial<GetMappingNoteService>
  let getRecordPeopleServiceMock: Partial<GetRecordPeopleService>
  let getWeightSkillServiceMock: Partial<GetWeightSkillService>
  let updateMappingNoteService

  const mappingNoteMock = getMockMappingNote()
  const recordPeopleMock = getMockRecordPeople()
  recordPeopleMock.average = 2
  const recordPeopleReturn = [recordPeopleMock, getMockRecordPeople()]

  const evaluationMatrixMock = [
    getMockEvaluationMatrix(),
    getMockEvaluationMatrix(),
    getMockEvaluationMatrix()
  ]

  mappingNoteMock.note = 3
  evaluationMatrixMock[0].skill_id = mappingNoteMock.skill_id
  evaluationMatrixMock[0].value = 2
  evaluationMatrixMock[1].skill_id = mappingNoteMock.skill_id
  evaluationMatrixMock[0].value = 3

  beforeEach(async () => {
    await mockConnection.create()

    getWeightSkillServiceMock = {
      execute: jest.fn()
        .mockImplementation(() => Promise.resolve(evaluationMatrixMock))
    }

    getRecordPeopleServiceMock = {
      execute: jest.fn()
        .mockImplementation(() => Promise.resolve(recordPeopleReturn))
    }

    getMappingNoteServiceMock = {
      execute: jest.fn()
    }

    updateMappingNoteService = new UpdateMappingNoteService({
      mappingNoteRepository: mappingNoteMockRepository,
      getMappingNoteService: getMappingNoteServiceMock as GetMappingNoteService,
      getRecordPeopleService: getRecordPeopleServiceMock as GetRecordPeopleService,
      getWeightSkillService: getWeightSkillServiceMock as GetWeightSkillService
    })
  })

  afterEach(async () => {
    await mockConnection.close()
  })

  it('call updateMappingNote and update data', async () => {
    mappingNoteMockRepository.updateMappingNote = jest.fn()
      .mockImplementation(() => Promise.resolve({
        affected: 1
      }))

    const otherMappingNoteMock = getMockMappingNote()
    const mockReturn = [mappingNoteMock, otherMappingNoteMock]
    getMappingNoteServiceMock.execute = jest.fn().mockImplementation(() => Promise.resolve(mockReturn))

    // const somaProdutos = evaluationMatrixMock[0].value * mappingNoteMock.note + evaluationMatrixMock[1].value * mappingNoteMock.note
    // const media = (recordPeopleReturn[0].average + recordPeopleReturn[1].average) / recordPeopleReturn.length
    // const somaPesos = evaluationMatrixMock[0].value + evaluationMatrixMock[1].value
    // const mediaPond = somaProdutos / somaPesos

    const mappingNote = await updateMappingNoteService.execute()
    expect(getRecordPeopleServiceMock.execute).toHaveBeenCalled()
    expect(getWeightSkillServiceMock.execute).toHaveBeenCalled()
    expect(mappingNote).toMatchObject({
      affected: 1
    })
  })
})
