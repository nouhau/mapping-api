import axios from "axios"

export const testServer = () => {
  const server = axios.create({
    baseURL: 'http://localhost:5010/',
    timeout: 30000
  })

  return server
}
