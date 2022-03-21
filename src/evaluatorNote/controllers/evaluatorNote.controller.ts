import { Request, Response } from 'express'
import { EvaluatorNoteService } from '../services/evaluatorNote.service'

export class EvaluatorNoteController {
  async getEvaluatorNoteByPeopleId (request: Request, response: Response): Promise<Response> {
    const evaluatorNoteService = new EvaluatorNoteService()
    const { peopleId } = request.params

    try {
      const notes = await evaluatorNoteService.getEvaluatorNoteByPeopleId(peopleId)
      return response.status(200).json({ notes })
    } catch (error) {
      return response.status(500).json({ message: 'Error' })
    }
  }
}
