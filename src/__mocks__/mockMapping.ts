import { randomUUID } from 'crypto'
import { Mapping } from '../common/entities/Mapping'

export const getMockMapping = (): Mapping => ({
  mapping_id: randomUUID().toString(),
  people_id: randomUUID().toString(),
  matrix_id: randomUUID().toString()
})
