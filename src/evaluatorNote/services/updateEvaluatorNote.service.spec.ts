import { UpdateRecordPeopleService } from '../../recordPeople/services/updateRecordPeople.service'
import mockConnection from '../../__mocks__/mockConnection'
import { getMockEvaluatorNote } from '../../__mocks__/mockEvaluatorNote'
import { GetEvaluatorNoteService } from './getEvaluatorNote.service'
import { UpdateEvaluatorNoteService } from './updateEvaluatorNote.service'

jest.mock('../../common/repositories/evaluatorNote.repository')

const evaluatorNoteMockRepository = require('../../common/repositories/evaluatorNote.repository')

describe('UpdateEvaluatorNote', () => {
  let updateEvaluatorNoteService
  const getEvaluatorNoteServiceMock: Partial<GetEvaluatorNoteService> = {
    execute: jest.fn()
  }

  const updateRecordPeopleServiceMock: Partial<UpdateRecordPeopleService> = {
    execute: jest.fn()
  }

  const evaluatorNoteMock = getMockEvaluatorNote()

  beforeEach(async () => {
    await mockConnection.create()

    updateEvaluatorNoteService = new UpdateEvaluatorNoteService({
      evaluatorNoteRepository: evaluatorNoteMockRepository,
      note: evaluatorNoteMock.note,
      updateRecordPeopleService: updateRecordPeopleServiceMock as UpdateRecordPeopleService,
      evaluatorId: evaluatorNoteMock.evaluator_id,
      peopleId: evaluatorNoteMock.people_id,
      evidenceId: evaluatorNoteMock.evidence_id,
      getEvaluatorNoteService: getEvaluatorNoteServiceMock as GetEvaluatorNoteService
    })

    evaluatorNoteMockRepository.updateEvaluatorNote = jest.fn()
      .mockImplementation(() => Promise.resolve({
        affected: 1
      }))
  })

  afterEach(async () => {
    await mockConnection.close()
  })

  it('call updateRecordPeople when have array with two evaluatorNotes', async () => {
    getEvaluatorNoteServiceMock.execute = jest.fn().mockImplementation(() => Promise.resolve([evaluatorNoteMock, evaluatorNoteMock]))

    const evaluatorNote = await updateEvaluatorNoteService.execute()
    expect(getEvaluatorNoteServiceMock.execute).toHaveBeenCalled()
    expect(updateRecordPeopleServiceMock.execute).toHaveBeenCalled()
    expect(evaluatorNote).toMatchObject({
      affected: 1
    })
  })

  it('not call updateRecordPeople when have array with one evaluatorNotes', async () => {
    getEvaluatorNoteServiceMock.execute = jest.fn().mockImplementation(() => Promise.resolve([evaluatorNoteMock]))

    const evaluatorNote = await updateEvaluatorNoteService.execute()
    expect(getEvaluatorNoteServiceMock.execute).toHaveBeenCalled()
    expect(updateRecordPeopleServiceMock.execute).not.toHaveBeenCalled()
    expect(evaluatorNote).toMatchObject({
      affected: 1
    })
  })
})
