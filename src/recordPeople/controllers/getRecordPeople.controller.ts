import { Request, Response } from 'express'
import { GetRecordPeopleService } from '../services/getRecordPeople.service'

export class GetRecordPeopleController {
  async handle (request: Request, response: Response): Promise<Response> {
    const getRecordPeopleService = new GetRecordPeopleService()

    return await getRecordPeopleService.execute()
      .then(async recordPeople => {
        return response.status(200).json(recordPeople)
      })
      .catch(() => {
        return response.status(500).json({ message: 'Error' })
      })
  }
}
