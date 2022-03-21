import getManagerMock from '../../__mocks__/getEntityManagerMock'
import { getMockEvaluatorNote } from '../../__mocks__/mockEvaluatorNote'
import { EvaluatorNoteRepository } from './evaluatorNote.repository'

describe('EvaluatorNoteRepository', () => {
  const evaluatorNoteMock = getMockEvaluatorNote()

  it('should call method updateEvaluatorNote method and return affected rows', async () => {
    const managerMock = await getManagerMock({
      updateReturn: {
        affected: 1
      }
    })

    const evaluatorNoteRepository = new EvaluatorNoteRepository(managerMock)

    await evaluatorNoteRepository.updateEvaluatorNote(
      evaluatorNoteMock.evaluator_id,
      evaluatorNoteMock.evidence_id,
      evaluatorNoteMock.people_id,
      evaluatorNoteMock.note
    )
    expect(managerMock.update).toHaveBeenCalled()
  })

  it('should call method getEvaluatorNote and return array with array of evaluatorNote', async () => {
    const managerMock = await getManagerMock({
      findReturn: [evaluatorNoteMock]
    })

    const evaluatorNoteRepository = new EvaluatorNoteRepository(managerMock)
    await evaluatorNoteRepository.getEvaluatorNote(evaluatorNoteMock.evidence_id, evaluatorNoteMock.people_id)
    expect(managerMock.find).toHaveBeenCalled()
  })

  it('should call method getEvaluatorNoteByPeopleId and return array with array of evaluatorNote', async () => {
    const managerMock = await getManagerMock({
      findReturn: [evaluatorNoteMock]
    })

    const evaluatorNoteRepository = new EvaluatorNoteRepository(managerMock)
    await evaluatorNoteRepository.getEvaluatorNoteByPeopleId(evaluatorNoteMock.people_id)
    expect(managerMock.find).toHaveBeenCalled()
  })
})
