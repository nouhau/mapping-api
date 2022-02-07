import { UpdateRecordPeopleService } from '../../recordPeople/services/updateRecordPeople.service'
import mockConnection from '../../__mocks__/mockConnection'
import { getMockEvaluatorNote } from '../../__mocks__/mockEvaluatorNote'
import { UpdateEvaluatorNoteService } from './updateEvaluatorNote.service'

jest.mock('../../common/repositories/evaluatorNote.repository')
jest.mock('../../common/repositories/recordPeople.repository')

const evaluatorNoteMockRepository = require('../../common/repositories/evaluatorNote.repository')
const recordPeopleMockRepository = require('../../common/repositories/recordPeople.repository')

describe('UpdateEvaluatorNote', () => {
  let updateEvaluatorNoteService
  let updateRecordPeopleServiceMock

  const evaluatorNoteMock = getMockEvaluatorNote()

  beforeEach(async () => {
    await mockConnection.create()

    updateRecordPeopleServiceMock = new UpdateRecordPeopleService({
      recordPeopleRepository: recordPeopleMockRepository,
      value: 1
    })

    updateEvaluatorNoteService = new UpdateEvaluatorNoteService({
      evaluatorNoteRepository: evaluatorNoteMockRepository,
      note: evaluatorNoteMock.note,
      updateRecordPeopleService: updateRecordPeopleServiceMock,
      evaluatorId: evaluatorNoteMock.evaluator_id,
      peopleId: evaluatorNoteMock.people_id,
      evidenceId: evaluatorNoteMock.evidence_id
    })
  })

  afterEach(async () => {
    await mockConnection.clear()
  })

  it('update evaluator note', async () => {
    evaluatorNoteMockRepository.updateEvaluatorNote = jest.fn()
      .mockImplementation(() => Promise.resolve({
        affected: 1
      }))

    updateRecordPeopleServiceMock.execute = jest.fn()

    const evaluatorNote = await updateEvaluatorNoteService.execute()
    expect(updateRecordPeopleServiceMock.execute).toHaveBeenCalled()
    expect(evaluatorNote).toMatchObject({
      affected: 1
    })
  })
})
