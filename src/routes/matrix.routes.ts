import { Router } from 'express'
import { CreateMatrixController } from '../matrix/controllers/createMatrix.controller'
import { GetAllMatrixController } from '../matrix/controllers/getAllMatrix.controller'
import { GetEvaluationMatrixController } from '../matrix/controllers/getEvaluationMatrix.controller'

const matrixRouter = Router()

const getAllMatrixController = new GetAllMatrixController()
const createMatrixController = new CreateMatrixController()
const getEvaluationMatrixController = new GetEvaluationMatrixController()

matrixRouter.get('/matrix', getAllMatrixController.handle)
matrixRouter.get('/evaluation', getEvaluationMatrixController.handle)
matrixRouter.post('/matrix', createMatrixController.handle)

export { matrixRouter }
