import mockConnection from '../../__mocks__/mockConnection'
import { getMockEvaluatorNote } from '../../__mocks__/mockEvaluatorNote'
import { GetEvaluatorNoteService } from './getEvaluatorNote.service'

jest.mock('../../common/repositories/evaluatorNote.repository')

const evaluatorNoteMockRepository = require('../../common/repositories/evaluatorNote.repository')

describe('GetEvaluatorNote', () => {
  let getEvaluatorNoteService

  const evaluatorNoteMock = getMockEvaluatorNote()

  beforeEach(async () => {
    await mockConnection.create()

    getEvaluatorNoteService = new GetEvaluatorNoteService({
      evaluatorNoteRepository: evaluatorNoteMockRepository,
      peopleId: evaluatorNoteMock.people_id,
      evidenceId: evaluatorNoteMock.evidence_id
    })
  })

  afterEach(async () => {
    await mockConnection.clear()
  })

  it('get array with evaluator note', async () => {
    evaluatorNoteMockRepository.getEvaluatorNote = jest.fn()
      .mockImplementation(() => Promise.resolve([evaluatorNoteMock]))

    const evaluatorNote = await getEvaluatorNoteService.execute()
    expect(evaluatorNote).toMatchObject([evaluatorNoteMock])
  })
})
