import { randomUUID } from 'crypto'
import { Matrix } from '../common/entities/Matrix'
import { randomString } from '../common/randomString'

export const getMockMatrix = (): Matrix => ({
  matrix_id: randomUUID().toString(),
  name: randomString(),
  active: true,
  desc: 'Some description',
  created_at: new Date()
})
