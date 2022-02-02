import { randomUUID } from 'crypto'
import { EvaluationMatrix } from '../common/entities/EvaluationMatrix'
import { randomString } from '../common/randomString'

const mockEvidenceId = randomUUID.toString()
const mockSkillId = randomUUID.toString()
const mockMatrixId = randomUUID.toString()

export const getMockEvaluationMatrix = (): EvaluationMatrix => ({
  evaluation_matrix_id: randomUUID.toString(),
  evidence_id: mockEvidenceId,
  skill_id: mockSkillId,
  matrix_id: mockMatrixId,
  value: 2,
  matrixId: {
    matrix_id: mockMatrixId,
    active: false,
    name: randomString(),
    desc: '',
    created_at: new Date()
  },
  evidenceId: {
    evidence_id: mockEvidenceId,
    name: randomString(),
    desc: ''
  },
  skillId: {
    skill_id: mockSkillId,
    name: randomString(),
    desc: ''
  }
})
