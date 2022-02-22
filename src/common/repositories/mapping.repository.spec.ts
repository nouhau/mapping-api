import getManagerMock from '../../__mocks__/getEntityManagerMock'
import { getMockMapping } from '../../__mocks__/mockMapping'
import { MappingRepository } from './mapping.repository'

describe('MappingRepository', () => {
  const mappingMock = getMockMapping()

  it('should call getMapping and return mapping', async () => {
    const managerMock = await getManagerMock({
      findOneReturn: mappingMock
    })

    const mappingNoteRepository = new MappingRepository(managerMock)

    const mappingNote = await mappingNoteRepository.getMapping(mappingMock.mapping_id)
    expect(mappingNote).toMatchObject(mappingMock)
  })
})
