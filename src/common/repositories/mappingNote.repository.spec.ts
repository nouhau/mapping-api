import getManagerMock from '../../__mocks__/getEntityManagerMock'
import { getMockMappingNote } from '../../__mocks__/mockMappingNote'
import { MappingNoteRepository } from './mappingNote.repository'

describe('MappingNoteRepository', () => {
  const mappingNoteMock = getMockMappingNote()
  const otherMappingNoteMock = getMockMappingNote()
  otherMappingNoteMock.mapping_id = mappingNoteMock.mapping_id

  it('should call getMapping and return mapping array', async () => {
    const managerMock = await getManagerMock({
      findReturn: [mappingNoteMock, otherMappingNoteMock]
    })

    const mappingNoteRepository = new MappingNoteRepository(managerMock)

    const mappingNote = await mappingNoteRepository.getMapping(mappingNoteMock.mapping_id)
    expect(mappingNote).toMatchObject([mappingNoteMock, otherMappingNoteMock])
  })

  it('should call updateMappingNote and return affected rows', async () => {
    const managerMock = await getManagerMock({
      updateReturn: {
        affected: 1
      }
    })

    const mappingNoteRepository = new MappingNoteRepository(managerMock)

    const mappingNote = await mappingNoteRepository.updateMappingNote(
      mappingNoteMock.mapping_id,
      mappingNoteMock.skill_id,
      2
    )

    expect(mappingNote).toMatchObject({
      affected: 1
    })
  })
})
