import { v4 as uuid } from 'uuid'
import { EvaluationMatrix } from '../common/entities/EvaluationMatrix'
import { randomString } from '../common/randomString'

const mockEvidenceId = uuid()
const mockSkillId = uuid()
const mockMatrixId = uuid()

export const getMockEvaluationMatrix = (): EvaluationMatrix => ({
  evaluation_matrix_id: uuid(),
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
