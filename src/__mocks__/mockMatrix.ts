import { v4 as uuid } from 'uuid'
import { Matrix } from '../common/entities/Matrix'
import { randomString } from '../common/randomString'

export const getMockMatrix = (): Matrix => ({
  matrix_id: uuid(),
  name: randomString(),
  active: true,
  desc: 'Some description',
  created_at: new Date()
})
