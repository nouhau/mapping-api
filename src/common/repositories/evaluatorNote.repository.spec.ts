import getManagerMock from '../../__mocks__/getEntityManagerMock'
// import { getMockEvaluatorNote } from '../../__mocks__/mockEvaluatorNote'
import { EvaluatorNoteRepository } from './evaluatorNote.repository'

describe('EvaluatorNoteRepository', () => {
  // const evaluatorNoteMock = getMockEvaluatorNote()

  it('should call getRecord method and return evaluatorNote array', async () => {
    const managerMock = await getManagerMock({
      updateReturn: {
        affected: 1
      }
    })

    const evaluatorNoteRepository = new EvaluatorNoteRepository(managerMock)

    await evaluatorNoteRepository.updateEvaluatorNote()
    expect(managerMock.update).toHaveBeenCalled()
  })
})
