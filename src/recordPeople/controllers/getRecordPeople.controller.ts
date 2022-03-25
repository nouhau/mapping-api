import { Request, Response } from 'express'
import { LoggerService } from '../../common/LoggerService'
import { GetRecordPeopleService } from '../services/getRecordPeople.service'

export class GetRecordPeopleController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { peopleId } = request.params
    const logger: LoggerService = new LoggerService()
    const getRecordPeopleService = new GetRecordPeopleService()

    return await getRecordPeopleService.execute(peopleId)
      .then(result => {
        return response.status(200).json(result)
      })
      .catch((error) => {
        logger.error(
          'Request error',
          'recordPeopleController',
          error
        )
        console.log(error)
        return response.status(500).json({ message: 'Error' })
      })
  }
}
