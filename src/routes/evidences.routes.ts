import { Router } from 'express'
import { CreateEvidenceController } from '../evidences/controllers/createEvidence.controller'
import { GetAllEvidenceController } from '../evidences/controllers/getAllEvidence.controller'
import { verifyAuthenticated } from '../middlewares/verifyAuthenticated'
import { verifyEvaluator } from '../middlewares/verifyEvaluator'

const evidenceRouter = Router()

const getAllEvidenceController = new GetAllEvidenceController()
const createEvidenceController = new CreateEvidenceController()

evidenceRouter.get('/evidences', getAllEvidenceController.handle)
evidenceRouter.post('/evidences', verifyAuthenticated, verifyEvaluator, createEvidenceController.handle)

export { evidenceRouter }
