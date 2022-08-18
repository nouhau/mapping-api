import { randomUUID } from 'crypto';
import { Mapping } from '../common/entities/Mapping';

export const getMockMapping = ({
  mappingId = randomUUID(),
  peopleId = randomUUID(),
  matrixId = randomUUID(),
  feedback = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
}): Mapping => ({
  mapping_id: mappingId,
  people_id: peopleId,
  matrix_id: matrixId,
  feedback
})
