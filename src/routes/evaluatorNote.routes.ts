import { Router } from 'express'
import { UpdateEvaluatorNoteController } from '../evaluatorNote/controllers/updateEvaluatorNote.controller'

const evaluatorNoteRouter = Router()

const updateEvaluatorNoteController = new UpdateEvaluatorNoteController()

evaluatorNoteRouter.put('/evaluator', updateEvaluatorNoteController.handle)

export { evaluatorNoteRouter }
