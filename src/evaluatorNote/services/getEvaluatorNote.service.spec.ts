import mockConnection from '../../__mocks__/mockConnection'
import { getMockEvaluatorNote } from '../../__mocks__/mockEvaluatorNote'
import { GetEvaluatorNoteService } from './getEvaluatorNote.service'

jest.mock('../../common/repositories/evaluatorNote.repository')

const evaluatorNoteMockRepository = require('../../common/repositories/evaluatorNote.repository')

describe('GetEvaluatorNote', () => {
  let getEvaluatorNoteService: GetEvaluatorNoteService

  const evaluatorNoteMock = getMockEvaluatorNote()

  beforeEach(async () => {
    await mockConnection.create()

    getEvaluatorNoteService = new GetEvaluatorNoteService(evaluatorNoteMockRepository)
  })

  afterEach(async () => {
    await mockConnection.clear()
  })

  it('get array with evaluator note', async () => {
    evaluatorNoteMockRepository.getEvaluatorNote = jest.fn()
      .mockImplementation(() => Promise.resolve([evaluatorNoteMock]))

    const evaluatorNote = await getEvaluatorNoteService.execute(evaluatorNoteMock.evidence_id, evaluatorNoteMock.people_id)
    expect(evaluatorNote).toMatchObject([evaluatorNoteMock])
  })
})
