import { UpdateRecordPeopleService } from '../../recordPeople/services/updateRecordPeople.service'
import mockConnection from '../../__mocks__/mockConnection'
import { getMockEvaluatorNote } from '../../__mocks__/mockEvaluatorNote'
import { EvaluatorNoteService } from './evaluatorNote.service'
import { UpdateEvaluatorNoteService } from './updateEvaluatorNote.service'

jest.mock('../../common/repositories/evaluatorNote.repository')

const evaluatorNoteMockRepository = require('../../common/repositories/evaluatorNote.repository')

describe('UpdateEvaluatorNote', () => {
  let updateEvaluatorNoteService: UpdateEvaluatorNoteService
  const evaluatorNoteServiceMock: Partial<EvaluatorNoteService> = {
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
      updateRecordPeopleService: updateRecordPeopleServiceMock as UpdateRecordPeopleService,
      evaluatorNoteService: evaluatorNoteServiceMock as EvaluatorNoteService
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
    evaluatorNoteServiceMock.execute = jest.fn().mockImplementation(() => Promise.resolve([evaluatorNoteMock, evaluatorNoteMock]))

    const evaluatorNote = await updateEvaluatorNoteService.execute(
      evaluatorNoteMock.evaluator_id,
      evaluatorNoteMock.people_id,
      [
        {
          evidenceId: evaluatorNoteMock.evidence_id,
          note: evaluatorNoteMock.note
        },
        {
          evidenceId: evaluatorNoteMock.evidence_id,
          note: evaluatorNoteMock.note
        }
      ]
    )
    expect(evaluatorNoteServiceMock.execute).toHaveBeenCalled()
    expect(updateRecordPeopleServiceMock.execute).toHaveBeenCalled()
    expect(evaluatorNote).toMatchObject({
      affected: 2
    })
  })

  it('not call updateRecordPeople when have array with one evaluatorNotes', async () => {
    evaluatorNoteServiceMock.execute = jest.fn().mockImplementation(() => Promise.resolve([evaluatorNoteMock]))

    const evaluatorNote = await updateEvaluatorNoteService.execute(
      evaluatorNoteMock.evaluator_id,
      evaluatorNoteMock.people_id,
      [{
        evidenceId: evaluatorNoteMock.evidence_id,
        note: evaluatorNoteMock.note
      }]
    )
    expect(evaluatorNoteServiceMock.execute).toHaveBeenCalled()
    expect(updateRecordPeopleServiceMock.execute).not.toHaveBeenCalled()
    expect(evaluatorNote).toMatchObject({
      affected: 1
    })
  })
})
