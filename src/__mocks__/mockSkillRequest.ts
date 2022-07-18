import { SkillRequest } from '../skill/dto/skillRequest.dto';

export const getMockSkillRequest = (
  name = 'string',
  desc = 'desc string'
): SkillRequest => ({
  name,
  desc
})
