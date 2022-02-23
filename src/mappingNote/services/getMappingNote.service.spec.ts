import mockConnection from '../../__mocks__/mockConnection'
import { getMockMappingNote } from '../../__mocks__/mockMappingNote'
import { GetMappingNoteService } from './getMappingNote.service'

jest.mock('../../common/repositories/mappingNote.repository')

const mappingNoteMockRepository = require('../../common/repositories/mappingNote.repository')
const getMappingNoteService = new GetMappingNoteService(mappingNoteMockRepository)

describe('GetMappingNoteService', () => {
  const mockMappingNote = getMockMappingNote()

  beforeEach(async () => {
    await mockConnection.create()
  })

  afterEach(async () => {
    await mockConnection.close()
  })

  it('get mapping with notes', async () => {
    mappingNoteMockRepository.getMapping = jest.fn()
      .mockImplementation(() => Promise.resolve([mockMappingNote]))

    const mapping = await getMappingNoteService.execute(mockMappingNote.mapping_id)
    expect(mapping).toMatchObject([mockMappingNote])
  })
})
