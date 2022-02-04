import mockConnection from '../../__mocks__/mockConnection'
import { getMockEvidence } from '../../__mocks__/mockEvidence'
import { GetAllEvidenceService } from './getAllEvidence.service'

jest.mock('../../common/repositories/evidences.repository')

const evidenceMockRepository = require('../../common/repositories/evidences.repository')
const getAllEvidenceService = new GetAllEvidenceService(evidenceMockRepository)

describe('GetAllEvidence', () => {
  const evidenceMock = getMockEvidence()
  const otherEvidenceMock = getMockEvidence()

  beforeEach(async () => {
    await mockConnection.create()
  })

  afterEach(async () => {
    await mockConnection.clear()
  })

  it('get all evidences', async () => {
    evidenceMockRepository.getAll = jest.fn()
      .mockImplementation(() => Promise.resolve([evidenceMock, otherEvidenceMock]))

    const evidences = await getAllEvidenceService.execute()
    expect(evidences).toMatchObject([evidenceMock, otherEvidenceMock])
  })
})
