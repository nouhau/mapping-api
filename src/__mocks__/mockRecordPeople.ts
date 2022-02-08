import { randomUUID } from 'crypto'
import { RecordPeople } from '../common/entities/RecordPeople'
import { randomString } from '../common/randomString'

const mockEvidenceId = randomUUID().toString()

export const getMockRecordPeople = (): RecordPeople => ({
  record_id: randomUUID().toString(),
  people_id: randomString(),
  evidence_id: mockEvidenceId,
  average: 1,
  evidenceId: {
    evidence_id: mockEvidenceId,
    name: randomString(),
    desc: ''
  }
})
