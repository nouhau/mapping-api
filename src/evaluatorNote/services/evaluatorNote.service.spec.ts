import mockConnection from '../../__mocks__/mockConnection'
import { getMockEvaluatorNote } from '../../__mocks__/mockEvaluatorNote'
import { EvaluatorNoteService } from './evaluatorNote.service'

jest.mock('../../common/repositories/evaluatorNote.repository')

const evaluatorNoteMockRepository = require('../../common/repositories/evaluatorNote.repository')

describe('EvaluatorNote', () => {
  let evaluatorNoteService: EvaluatorNoteService

  const evaluatorNoteMock = getMockEvaluatorNote()

  beforeAll(async () => {
    await mockConnection.create()

    evaluatorNoteService = new EvaluatorNoteService(evaluatorNoteMockRepository)
  })

  afterAll(async () => {
    await mockConnection.clear()
  })

  it('get array with evaluator note', async () => {
    evaluatorNoteMockRepository.getEvaluatorNote = jest.fn()
      .mockImplementation(() => Promise.resolve([evaluatorNoteMock]))

    const evaluatorNote = await evaluatorNoteService.execute(evaluatorNoteMock.evidence_id, evaluatorNoteMock.people_id)
    expect(evaluatorNote).toMatchObject([evaluatorNoteMock])
  })

  it('call getEvaluatorNoteByPeopleId and get array with evaluator note', async () => {
    evaluatorNoteMockRepository.getEvaluatorNoteByPeopleId = jest.fn()
      .mockImplementation(() => Promise.resolve([evaluatorNoteMock]))

    const evaluatorNote = await evaluatorNoteService.getEvaluatorNoteByPeopleId(evaluatorNoteMock.people_id)
    expect(evaluatorNote).toMatchObject([evaluatorNoteMock])
  })
})
