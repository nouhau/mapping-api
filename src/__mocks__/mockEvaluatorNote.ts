import { randomUUID } from 'crypto'
import { EvaluatorNote } from '../common/entities/EvaluatorNote'

export const getMockEvaluatorNote = ({
  evidenceId = randomUUID().toString(),
  peopleId = randomUUID().toString(),
  note = 1
}): EvaluatorNote => ({
  evaluation_id: randomUUID().toString(),
  evaluator_id: randomUUID().toString(),
  evidence_id: evidenceId,
  people_id: peopleId,
  note,
  evidenceId: {
    evidence_id: evidenceId,
    name: 'evidence',
    desc: 'desc'
  }
})
