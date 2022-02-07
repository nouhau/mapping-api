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

    await evaluatorNoteRepository.updateEvaluatorNote()
    expect(managerMock.update).toHaveBeenCalled()
  })

  it('should method getEvaluatorNote and return array with array of evaluatorNote', async () => {
    const managerMock = await getManagerMock({
      findReturn: [evaluatorNoteMock]
    })

    const evaluatorNoteRepository = new EvaluatorNoteRepository(managerMock)
    await evaluatorNoteRepository.getEvaluatorNote()
    expect(managerMock.find).toHaveBeenCalled()
  })
})
