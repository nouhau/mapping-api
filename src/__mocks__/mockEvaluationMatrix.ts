import { randomUUID } from 'crypto'
import { EvaluationMatrix } from '../common/entities/EvaluationMatrix'

export const getMockEvaluationMatrix = ({
  mockEvidenceId = randomUUID(),
  mockSkillId = randomUUID(),
  mockMatrixId = randomUUID(),
  value = 2
}): EvaluationMatrix => ({
  evaluation_matrix_id: randomUUID(),
  evidence_id: mockEvidenceId,
  skill_id: mockSkillId,
  matrix_id: mockMatrixId,
  value,
  matrixId: {
    matrix_id: mockMatrixId,
    active: false,
    name: 'matrix',
    desc: 'desc',
    created_at: new Date()
  },
  evidenceId: {
    evidence_id: mockEvidenceId,
    name: 'evidence',
    desc: 'desc'
  },
  skillId: {
    skill_id: mockSkillId,
    name: 'skill',
    desc: 'desc'
  }
})
