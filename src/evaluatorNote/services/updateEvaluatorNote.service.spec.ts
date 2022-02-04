import mockConnection from '../../__mocks__/mockConnection'
import { getMockEvaluatorNote } from '../../__mocks__/mockEvaluatorNote'
import { UpdateEvaluatorNoteService } from './updateEvaluatorNote.service'

jest.mock('../../common/repositories/evaluatorNote.repository')

const evaluatorNoteMockRepository = require('../../common/repositories/evaluatorNote.repository')

describe('UpdateEvaluatorNote', () => {
  let updateEvaluatorNoteService
  const evaluatorNoteMock = getMockEvaluatorNote()

  beforeEach(async () => {
    await mockConnection.create()
    updateEvaluatorNoteService = new UpdateEvaluatorNoteService({
      evaluatorNoteRepository: evaluatorNoteMockRepository,
      evaluatorId: evaluatorNoteMock.evaluator_id,
      peopleId: evaluatorNoteMock.people_id,
      evidenceId: evaluatorNoteMock.evidence_id,
      note: evaluatorNoteMock.note
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

    const evaluatorNote = await updateEvaluatorNoteService.execute()
    expect(evaluatorNote).toMatchObject({
      affected: 1
    })
  })
})
