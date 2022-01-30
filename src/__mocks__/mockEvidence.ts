import { v4 as uuid } from 'uuid'
import { Evidence } from '../common/entities/Evidences'
import { randomString } from '../common/randomString'

export const getMockEvidence = (): Evidence => ({
  evidence_id: uuid(),
  name: randomString(),
  desc: 'Some description'
})
