import { Router } from 'express'
import { EvaluatorNoteController } from '../evaluatorNote/controllers/evaluatorNote.controller'
import { UpdateEvaluatorNoteController } from '../evaluatorNote/controllers/updateEvaluatorNote.controller'
import { verifyAuthenticated } from '../middlewares/verifyAuthenticated'
import { verifyEvaluator } from '../middlewares/verifyEvaluator'

const evaluatorNoteRouter = Router()

const updateEvaluatorNoteController = new UpdateEvaluatorNoteController()
const evaluatorNoteController = new EvaluatorNoteController()

evaluatorNoteRouter.get('/evaluatornote/:peopleId', evaluatorNoteController.getEvaluatorNoteByPeopleId)
evaluatorNoteRouter.put('/evaluatornote', verifyAuthenticated, verifyEvaluator, updateEvaluatorNoteController.handle)

export { evaluatorNoteRouter }
