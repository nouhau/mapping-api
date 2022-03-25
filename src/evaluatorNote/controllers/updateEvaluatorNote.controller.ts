import { validateOrReject } from 'class-validator'
import { Request, Response } from 'express'
import { LoggerService } from '../../common/LoggerService'
import { EvaluatorNoteRequest } from '../dto/evaluatorNoteRequest.dto'
import { UpdateEvaluatorNoteService } from '../services/updateEvaluatorNote.service'

export class UpdateEvaluatorNoteController {
  async handle (request: Request, response: Response): Promise<Response> {
    const logger: LoggerService = new LoggerService()
    const evaluatorNoteRequest = new EvaluatorNoteRequest(request.body)
    const updateEvaluatorNoteService = new UpdateEvaluatorNoteService({})

    return await validateOrReject(evaluatorNoteRequest)
      .then(async () => {
        return await updateEvaluatorNoteService.execute(
          evaluatorNoteRequest.evaluatorId,
          evaluatorNoteRequest.peopleId,
          evaluatorNoteRequest.notes
        )
          .then(result => {
            return response.status(200).json(result)
          })
          .catch((error) => {
            logger.error(
              'Error detailed',
              error,
              'Request error'
            )
            throw new Error()
          })
      })
      .catch((error) => {
        let errorCode: string
        if (Array.isArray(error)) {
          error.forEach(item => {
            logger.error(
              `No ${item.property} is provided `,
              error,
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
