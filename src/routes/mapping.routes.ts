import { Router } from 'express'
import { MappingNoteController } from '../mappingNote/controllers/mappingNote.controller'
import { UpdateMappingNoteController } from '../mappingNote/controllers/updateMappingNote.controller'
import { verifyAuthenticated } from '../middlewares/verifyAuthenticated'
import { verifyEvaluator } from '../middlewares/verifyEvaluator'

const mappingNoteRouter = Router()

const updateMappingNoteController = new UpdateMappingNoteController()
const mappingNoteController = new MappingNoteController()

mappingNoteRouter.put('/mapping', verifyAuthenticated, verifyEvaluator, updateMappingNoteController.handle)
mappingNoteRouter.get('/mappingNote/:peopleId', verifyAuthenticated, verifyEvaluator, mappingNoteController.getMapping)

export { mappingNoteRouter }
