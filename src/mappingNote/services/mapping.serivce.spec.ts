import mockConnection from '../../__mocks__/mockConnection'
import { getMockMapping } from '../../__mocks__/mockMapping'
import { MappingService } from './mapping.service'

jest.mock('../../common/repositories/mapping.repository')

const mappingMockRepository = require('../../common/repositories/mapping.repository')
const mappingService = new MappingService(mappingMockRepository)

describe('MappingService', () => {
  const mockMapping = getMockMapping()

  beforeEach(async () => {
    await mockConnection.create()
  })

  afterEach(async () => {
    await mockConnection.close()
  })

  it('get mapping', async () => {
    mappingMockRepository.getMapping = jest.fn()
      .mockImplementation(() => Promise.resolve(mockMapping))

    const mapping = await mappingService.getMapping(mockMapping.mapping_id)
    expect(mapping).toMatchObject(mockMapping)
  })
})
