import { Router } from 'express'
import { UpdateMappingNoteController } from '../mappingNote/controllers/updateMappingNote.controller'
// import { verifyAuthenticated } from '../middlewares/verifyAuthenticated'

const mappingNoteRouter = Router()

const updateMappingNoteController = new UpdateMappingNoteController()

mappingNoteRouter.put('/mapping', updateMappingNoteController.handle)

export { mappingNoteRouter }
