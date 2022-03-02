import { Router } from 'express'
import { UpdateEvaluatorNoteController } from '../evaluatorNote/controllers/updateEvaluatorNote.controller'
import { verifyAuthenticated } from '../middlewares/verifyAuthenticated'
import { verifyEvaluator } from '../middlewares/verifyEvaluator'

const evaluatorNoteRouter = Router()

const updateEvaluatorNoteController = new UpdateEvaluatorNoteController()

evaluatorNoteRouter.put('/evaluator', verifyAuthenticated, verifyEvaluator, updateEvaluatorNoteController.handle)

export { evaluatorNoteRouter }
