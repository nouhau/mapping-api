import { Router } from 'express'
import { UpdateMappingNoteController } from '../mappingNote/controllers/updateMappingNote.controller'
import { verifyAuthenticated } from '../middlewares/verifyAuthenticated'
import { verifyEvaluator } from '../middlewares/verifyEvaluator'

const mappingNoteRouter = Router()

const updateMappingNoteController = new UpdateMappingNoteController()

mappingNoteRouter.put('/mapping', verifyAuthenticated, verifyEvaluator, updateMappingNoteController.handle)

export { mappingNoteRouter }
