import { randomUUID } from 'crypto';
import { MappingNote } from '../common/entities/MappingNote';

export const getMockMappingNote = ({
  mappingNoteId = randomUUID(),
  mappingId = randomUUID(),
  skillId = randomUUID()
}): MappingNote => ({
  mappingNote_id: mappingNoteId,
  mapping_id: mappingId,
  skill_id: skillId,
  note: 2,
  mappingId: {
    mapping_id: mappingId,
    people_id: randomUUID(),
    matrix_id: randomUUID()
  },
  skillId: {
    skill_id: skillId,
    name: 'skill',
    desc: 'desc'
  }
})
