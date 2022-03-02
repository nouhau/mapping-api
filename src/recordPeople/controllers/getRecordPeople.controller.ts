import { validateOrReject } from 'class-validator'
import { Request, Response } from 'express'
import { LoggerService } from '../../common/LoggerService'
import { RecordPeopleRequest } from '../dto/recordPeople.dto'
import { GetRecordPeopleService } from '../services/getRecordPeople.service'

export class GetRecordPeopleController {
  async handle (request: Request, response: Response): Promise<Response> {
    const logger: LoggerService = new LoggerService()
    const recordPeopleRequest = new RecordPeopleRequest(request.body)
    const getRecordPeopleService = new GetRecordPeopleService()

    return await validateOrReject(recordPeopleRequest)
      .then(async () => {
        return await getRecordPeopleService.execute(recordPeopleRequest.peopleId)
          .then(result => {
            console.log(result)
            return response.status(200).json(result)
          })
          .catch(() => {
            throw new Error()
          })
      })
      .catch((error) => {
        let errorCode: string
        if (Array.isArray(error)) {
          error.forEach(item => {
            logger.trace(
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
