import { Router } from 'express'
import { UpdateEvaluatorNoteController } from '../evaluatorNote/controllers/updateEvaluatorNote.controller'
// import { verifyAuthenticated } from '../middlewares/verifyAuthenticated'

const evaluatorNoteRouter = Router()

const updateEvaluatorNoteController = new UpdateEvaluatorNoteController()

// evaluatorNoteRouter.use(verifyAuthenticated)
evaluatorNoteRouter.put('/evaluator', updateEvaluatorNoteController.handle)

export { evaluatorNoteRouter }
