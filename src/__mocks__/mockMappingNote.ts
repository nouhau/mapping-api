import { randomUUID } from 'crypto'
import { MappingNote } from '../common/entities/MappingNote'
import { randomString } from '../common/randomString'

export const getMockMappingNote = (): MappingNote => ({
  mappingNote_id: randomUUID().toString(),
  mapping_id: randomUUID().toString(),
  skill_id: randomUUID().toString(),
  note: 2,
  mappingId: {
    mapping_id: randomUUID().toString(),
    people_id: randomUUID().toString()
  },
  skillId: {
    skill_id: randomUUID().toString(),
    name: randomString(),
    desc: 'Some description'
  }
})
