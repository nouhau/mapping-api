import { randomUUID } from "crypto";
import { UpdateRecordPeopleRequest } from "../recordPeople/dto/updateRecordPeopleRequest.dto";

export const getMockUpdateRecordPeopleRequest = ({
  peopleId = randomUUID(),
  evidenceId= randomUUID(),
  average = 1
}): UpdateRecordPeopleRequest => ({
  peopleId,
  evidenceId,
  average
})
