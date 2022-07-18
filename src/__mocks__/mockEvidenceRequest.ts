import { EvidenceRequest } from '../evidence/dto/evidenceRequest.dto';

export const getMockEvidenceRequest = (
  name = 'string',
  desc = 'desc string'
): EvidenceRequest => ({
  name,
  desc
})
