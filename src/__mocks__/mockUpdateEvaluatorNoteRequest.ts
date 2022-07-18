import { randomUUID } from "crypto";
import { UpdateEvaluatorNoteRequest } from "../evaluatorNote/dto/updateEvaluatorNoteRequest.dto";

export const getMockUpdateEvaluatorNoteRequest = ({
  evaluatorId = randomUUID(),
  evidenceId= randomUUID(),
  peopleId= randomUUID(),
  note = 1
}): UpdateEvaluatorNoteRequest => ({
  evaluatorId,
  evidenceId,
  peopleId,
  note
})
