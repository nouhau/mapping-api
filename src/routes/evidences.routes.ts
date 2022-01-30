import { Router } from 'express'
import { CreateEvidenceController } from '../evidences/controllers/createEvidence.controller'
import { GetAllEvidenceController } from '../evidences/controllers/getAllEvidence.controller'

const evidenceRouter = Router()

const getAllEvidenceController = new GetAllEvidenceController()
const createEvidenceController = new CreateEvidenceController()

evidenceRouter.get('/evidences', getAllEvidenceController.handle)
evidenceRouter.post('/evidences', createEvidenceController.handle)

export { evidenceRouter }
