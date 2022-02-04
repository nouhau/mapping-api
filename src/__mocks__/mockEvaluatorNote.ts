import { randomUUID } from 'crypto'
import { EvaluatorNote } from '../common/entities/EvaluatorNote'
import { randomString } from '../common/randomString'

const mockEvidenceId = randomUUID.toString()

export const getMockEvaluatorNote = (): EvaluatorNote => ({
  evaluation_id: randomUUID().toString(),
  evaluator_id: randomUUID().toString(),
  evidence_id: mockEvidenceId,
  people_id: randomUUID().toString(),
  note: 1,
  evidenceId: {
    evidence_id: mockEvidenceId,
    name: randomString(),
    desc: ''
  }
})
