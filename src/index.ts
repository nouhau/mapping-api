
import 'reflect-metadata'
import express from 'express'
import createConnection from './config/database'

import { evidenceRouter } from './routes/evidences.routes'
import { skillRouter } from './routes/skills.routes'
import { matrixRouter } from './routes/matrix.routes'
import { recordPeopleRouter } from './routes/recordPeople.routes'

createConnection()
const server = express()
server.use(express.json())

const PORT = process.env.PORT || 5000

server.use(evidenceRouter)
server.use(skillRouter)
server.use(matrixRouter, recordPeopleRouter)

server.listen(PORT, () => {
  console.log(`Server on port ${PORT} \nhttp://localhost:${PORT}`)
})
