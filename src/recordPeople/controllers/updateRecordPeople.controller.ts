import { Request, Response } from 'express'
import { UpdateRecordPeopleService } from '../services/updateRecordPeople.service'

export class UpdateRecordPeopleController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { value } = request.body
    console.log(value)
    const updateRecordPeopleService = new UpdateRecordPeopleService({ value })

    return await updateRecordPeopleService.execute()
      .then(async recordPeople => {
        return response.status(200).json(recordPeople)
      })
      .catch(() => {
        return response.status(500).json({ message: 'Error' })
      })
  }
}
