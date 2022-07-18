import { randomUUID } from 'crypto'
import { RecordPeople } from '../common/entities/RecordPeople'

export const getMockRecordPeople = ({
  evidenceId = randomUUID(),
  peopleId = randomUUID()
}): RecordPeople => ({
  record_id: randomUUID(),
  evidence_id: evidenceId,
  people_id: peopleId,
  average: 1,
  evidenceId: {
    evidence_id: evidenceId,
    name: 'evidence',
    desc: 'desc'
  }
})
