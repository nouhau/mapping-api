import { randomUUID } from 'crypto'
import { RecordPeople } from '../common/entities/RecordPeople'
import { randomString } from '../common/randomString'

const mockEvidenceId = randomUUID.toString()

export const getMockRecordPeople = (): RecordPeople => ({
  record_id: randomUUID.toString(),
  people_email: randomString(),
  evidence_id: mockEvidenceId,
  evaluator_1: 1,
  evaluator_2: 1,
  average: 1,
  evidenceId: {
    evidence_id: mockEvidenceId,
    name: randomString(),
    desc: ''
  }
})
