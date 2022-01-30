import getManagerMock from '../../__mocks__/getEntityManagerMock'
import { getMockEvidence } from '../../__mocks__/mockEvidence'
import { EvidenceRepository } from './evidences.repository'

describe('EvidenceRepository', () => {
  const evidenceMock = getMockEvidence()
  const otherEvidenceMock = getMockEvidence()

  it('should call getAll method and return evidences array', async () => {
    const managerMock = await getManagerMock({
      findReturn: [evidenceMock, otherEvidenceMock]
    })

    const evidenceRepository = new EvidenceRepository(managerMock)

    const evidences = await evidenceRepository.getAll()
    expect(evidences).toMatchObject([evidenceMock, otherEvidenceMock])
  })

  it('should call save method and return evidence created', async () => {
    const managerMock = await getManagerMock({
      saveReturn: evidenceMock
    })

    const evidenceRepository = new EvidenceRepository(managerMock)

    const evidence = await evidenceRepository.save(evidenceMock)
    expect(evidence).toMatchObject(evidenceMock)
  })
})
