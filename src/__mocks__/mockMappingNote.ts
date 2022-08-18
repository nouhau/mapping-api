import { randomUUID } from 'crypto';
import { MappingNote } from '../common/entities/MappingNote';

export const getMockMappingNote = ({
  mappingNoteId = randomUUID(),
  mappingId = randomUUID(),
  skillId = randomUUID(),
  peopleId = randomUUID(),
  matrixId = randomUUID()
}): MappingNote => ({
  mappingNote_id: mappingNoteId,
  mapping_id: mappingId,
  skill_id: skillId,
  note: 2,
  mappingId: {
    mapping_id: mappingId,
    people_id: peopleId,
    matrix_id: matrixId,
    feedback: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
  },
  skillId: {
    skill_id: skillId,
    name: 'skill',
    desc: 'desc'
  }
})
