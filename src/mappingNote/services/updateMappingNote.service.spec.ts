import { GetWeightSkillService } from '../../matrix/services/getWeightSkill.service'
import { GetRecordPeopleService } from '../../recordPeople/services/getRecordPeople.service'
import mockConnection from '../../__mocks__/mockConnection'
import { getMockMapping } from '../../__mocks__/mockMapping'
import { getMockMappingNote } from '../../__mocks__/mockMappingNote'
import { getMockRecordPeople } from '../../__mocks__/mockRecordPeople'
import { getMockEvaluationMatrix } from '../../__mocks__/mockEvaluationMatrix'
import { GetMappingNoteService } from './getMappingNote.service'
import { UpdateMappingNoteService } from './updateMappingNote.service'
import { MappingService } from './mapping.service'

jest.mock('../../common/repositories/mappingNote.repository')

const mappingNoteMockRepository = require('../../common/repositories/mappingNote.repository')

describe('UpdateMappingNote', () => {
  let getMappingNoteServiceMock: Partial<GetMappingNoteService>
  let getRecordPeopleServiceMock: Partial<GetRecordPeopleService>
  let getWeightSkillServiceMock: Partial<GetWeightSkillService>
  let mappingServiceMock: Partial<MappingService>
  let updateMappingNoteService: UpdateMappingNoteService

  const mappingMock = getMockMapping()
  const mappingNoteMock = getMockMappingNote()
  const recordPeopleMock = getMockRecordPeople()
  const otherRecordPeopleMock = getMockRecordPeople()

  const evaluationMatrixMock = [
    getMockEvaluationMatrix(),
    getMockEvaluationMatrix(),
    getMockEvaluationMatrix()
  ]

  recordPeopleMock.average = 2
  otherRecordPeopleMock.average = 0.5

  const recordPeopleReturn = [recordPeopleMock, otherRecordPeopleMock]

  mappingNoteMock.note = 3
  evaluationMatrixMock[0].skill_id = mappingNoteMock.skill_id
  evaluationMatrixMock[1].skill_id = mappingNoteMock.skill_id
  evaluationMatrixMock[0].evidence_id = recordPeopleMock.evidence_id
  evaluationMatrixMock[1].evidence_id = otherRecordPeopleMock.evidence_id
  evaluationMatrixMock[0].value = 2
  evaluationMatrixMock[1].value = 3

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

    mappingServiceMock = {
      getMapping: jest.fn()
        .mockImplementation(() => Promise.resolve(mappingMock))
    }

    updateMappingNoteService = new UpdateMappingNoteService(
      mappingNoteMockRepository,
      getMappingNoteServiceMock as GetMappingNoteService,
      getRecordPeopleServiceMock as GetRecordPeopleService,
      getWeightSkillServiceMock as GetWeightSkillService,
      mappingServiceMock as MappingService
    )
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
    evaluationMatrixMock[2].skill_id = otherMappingNoteMock.skill_id
    evaluationMatrixMock[2].value = 2
    evaluationMatrixMock[2].evidence_id = recordPeopleMock.evidence_id
    const mockReturn = [mappingNoteMock, otherMappingNoteMock]
    getMappingNoteServiceMock.execute = jest.fn().mockImplementation(() => Promise.resolve(mockReturn))

    // const somaProdutos = evaluationMatrixMock[0].value * mappingNoteMock.note + evaluationMatrixMock[1].value * mappingNoteMock.note
    // const media = (recordPeopleReturn[0].average + recordPeopleReturn[1].average) / recordPeopleReturn.length
    // const somaPesos = evaluationMatrixMock[0].value + evaluationMatrixMock[1].value
    // const mediaPond = somaProdutos / somaPesos

    const mappingNote = await updateMappingNoteService.execute(mappingMock.mapping_id)
    expect(getRecordPeopleServiceMock.execute).toHaveBeenCalled()
    expect(getWeightSkillServiceMock.execute).toHaveBeenCalled()
    expect(mappingNoteMockRepository.updateMappingNote).toHaveBeenCalledTimes(mockReturn.length)
    expect(mappingNote).toMatchObject({
      affected: mockReturn.length
    })
  })
})
