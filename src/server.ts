
import 'reflect-metadata'
import express, { Response, Request, NextFunction } from 'express'
import createConnection from './config/database'

import { evidenceRouter } from './routes/evidences.routes'
import { skillRouter } from './routes/skills.routes'
import { matrixRouter } from './routes/matrix.routes'
import { recordPeopleRouter } from './routes/recordPeople.routes'
import { evaluatorNoteRouter } from './routes/evaluatorNote.routes'
import { mappingNoteRouter } from './routes/mapping.routes'

createConnection()
const server = express()
server.use(express.json())

server.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof Error) {
    return response.status(400).json({
      error: error.message
    })
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  })
})

server.use(function (request: Request, response: Response, next: NextFunction) {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST')
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

server.get('/', (request: Request, response: Response) => {
  return response.status(200).json({ message: 'Wellcome' })
})

server.use(
  evidenceRouter,
  skillRouter,
  matrixRouter,
  recordPeopleRouter,
  evaluatorNoteRouter,
  mappingNoteRouter
)

export { server }
