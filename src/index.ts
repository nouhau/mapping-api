import { server } from './server'

const PORT = process.env.PORT || 5000

console.log('JUST A TEST')

server.listen(PORT, () => {
  console.log(`Server on port ${PORT} \nhttp://localhost:${PORT}`)
})
