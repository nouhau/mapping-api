import { Router } from 'express'
import { verifyAdmin } from '../middlewares/verifyAdmin'
import { verifyAuthenticated } from '../middlewares/verifyAuthenticated'
import { CreateSkillController } from '../skills/controllers/createSkill.controller'
import { GetAllSkillController } from '../skills/controllers/getAllSkill.controller'

const skillRouter = Router()

const getAllSkillController = new GetAllSkillController()
const createSkillController = new CreateSkillController()

skillRouter.get('/skills', getAllSkillController.handle)
skillRouter.post('/skills', verifyAuthenticated, verifyAdmin, createSkillController.handle)

export { skillRouter }
