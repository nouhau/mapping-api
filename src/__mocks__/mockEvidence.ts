import { randomUUID } from 'crypto'
import { Evidence } from '../common/entities/Evidences'
import { randomString } from '../common/randomString'

export const getMockEvidence = (): Evidence => ({
  evidence_id: randomUUID().toString(),
  name: randomString(),
  desc: 'Some description'
})
