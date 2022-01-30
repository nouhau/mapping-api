import { getConnection } from 'typeorm'
import createConnection from '../../config/database'
import { getMockEvidence } from '../../__mocks__/mockEvidence'
import { CreateEvidenceService } from './createEvidence.service'

jest.mock('../../common/repositories/evidences.repository')

const evidenceMockRepository = require('../../common/repositories/evidences.repository')

describe('CreateEvidenceService', () => {
  let createEvidenceService

  const evidenceMock = getMockEvidence()

  beforeEach(async () => {
    await createConnection()
    createEvidenceService = new CreateEvidenceService({
      evidenceRepository: evidenceMockRepository,
      name: evidenceMock.name,
      desc: evidenceMock.desc
    })
  })

  afterEach(async () => {
    const connection = getConnection()
    await connection.close()
  })

  it('Create and return a new evidence created', async () => {
    evidenceMockRepository.save = jest.fn()
      .mockImplementation(() => Promise.resolve(evidenceMock))

    const evidence = await createEvidenceService.execute()

    expect(evidenceMockRepository.save).toHaveBeenCalled()
    expect(evidence).toMatchObject(evidenceMock)
  })
})
