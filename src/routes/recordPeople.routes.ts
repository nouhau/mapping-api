import { Router } from 'express'
import { GetRecordPeopleController } from '../recordPeople/controllers/getRecordPeople.controller'

const recordPeopleRouter = Router()

const getRecordPeopleController = new GetRecordPeopleController()

recordPeopleRouter.get('/records', getRecordPeopleController.handle)

export { recordPeopleRouter }
