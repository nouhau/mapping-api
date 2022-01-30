import { Request, Response } from 'express'
import { CreateSkillService } from '../services/createSkill.service'

export class CreateSkillController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { name, desc } = request.body

    const createSkillService = new CreateSkillService({ name, desc })

    return await createSkillService.execute()
      .then(async skill => {
        return response.status(200).json(skill)
      })
      .catch(() => {
        return response.status(500).json({ message: 'Error' })
      })
  }
}
