import { Request, Response } from 'express'
import { GetAllSkillService } from '../services/getAllSkill.service'

export class GetAllSkillController {
  async handle (request: Request, response: Response): Promise<Response> {
    const getAllSkillService = new GetAllSkillService()

    return await getAllSkillService.execute()
      .then(async skills => {
        return response.status(200).json(skills)
      })
      .catch(() => {
        return response.status(500).json({ message: 'Error' })
      })
  }
}
