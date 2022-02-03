import { Router } from 'express'
import { GetRecordPeopleController } from '../recordPeople/controllers/getRecordPeople.controller'
import { UpdateRecordPeopleController } from '../recordPeople/controllers/updateRecordPeople.controller'

const recordPeopleRouter = Router()

const getRecordPeopleController = new GetRecordPeopleController()
const updateRecordPeopleController = new UpdateRecordPeopleController()

recordPeopleRouter.get('/records', getRecordPeopleController.handle)
recordPeopleRouter.put('/records', updateRecordPeopleController.handle)

export { recordPeopleRouter }
