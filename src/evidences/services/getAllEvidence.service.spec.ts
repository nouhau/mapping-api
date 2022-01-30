import { getConnection } from 'typeorm'
import createConnection from '../../config/database'
import { getMockEvidence } from '../../__mocks__/mockEvidence'
import { GetAllEvidenceService } from './getAllEvidence.service'

jest.mock('../../common/repositories/evidences.repository')

const evidenceMockRepository = require('../../common/repositories/evidences.repository')
const getAllEvidenceService = new GetAllEvidenceService(evidenceMockRepository)

describe('GetAllEvidence', () => {
  const evidenceMock = getMockEvidence()
  const otherEvidenceMock = getMockEvidence()

  beforeEach(async () => {
    await createConnection()
  })

  afterEach(async () => {
    const connection = getConnection()
    await connection.close()
  })

  it('get all evidences', async () => {
    evidenceMockRepository.getAll = jest.fn()
      .mockImplementation(() => Promise.resolve([evidenceMock, otherEvidenceMock]))

    const evidences = await getAllEvidenceService.execute()
    expect(evidences).toMatchObject([evidenceMock, otherEvidenceMock])
  })
})
