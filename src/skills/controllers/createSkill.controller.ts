import { Request, Response } from 'express'
import { validateOrReject } from 'class-validator'
import { LoggerService } from '../../common/LoggerService'
import { SkillRequest } from '../dto/skillRequest.dto'
import { CreateSkillService } from '../services/createSkill.service'

export class CreateSkillController {
  private logger: LoggerService = new LoggerService()

  async handle (request: Request, response: Response): Promise<Response> {
    const skillRequest: SkillRequest = new SkillRequest(request.body)
    const createSkillService = new CreateSkillService(request.body)

    return await validateOrReject(skillRequest)
      .then(async () => {
        return await createSkillService.execute()
          .then(skill => {
            return response.status(200).json(skill)
          })
          .catch(() => {
            throw new Error()
          })
      })
      .catch((error) => {
        let errorCode: string
        if (Array.isArray(error)) {
          error.forEach(item => {
            this.logger.trace(
              `No ${item.property} is provided `,
              'Request error'
            )
            errorCode = item.constraints[Object.keys(item.constraints)[0]]
          })
        }
        if (errorCode) {
          return response.status(400).json({ message: errorCode })
        }
        return response.status(500).json({ message: 'Error' })
      })
  }
}
