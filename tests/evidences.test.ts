import { DataTest } from './utils/dataTest'
import { testServer } from './utils/testServer'

describe('/evidences', () => {
  const data = new DataTest()
  const server = testServer()

  const requestBody = {
    name: 'Some evidence',
    desc: 'Description'
  }

  const requestOptions = {
    headers: { 
      'Authorization': `Bearer ${process.env.TEST_TOKEN}`,
      'Content-Type': 'application/json'
    }
  }

  beforeAll(async () => {
    await data.createConnection()
  })

  afterAll(async () => {
    await data.closeConnection()
  })

  it('should return a array with evidence', async () => {
    await data.createEvidences()
    const dataReturn = []
    
    const response = await server.get('/evidences')

    response.data.find( evidence => {
      if(
        evidence.evidence_id === 'cd5cd3a0-ae55-47a0-899e-82ed8c659122' || 
        evidence.evidence_id === '41e7d0a5-2772-4094-ad66-d85349366a34'
      ) {
        dataReturn.push(evidence)
      }
    })

    expect(dataReturn).toMatchObject([
        {
          evidence_id: 'cd5cd3a0-ae55-47a0-899e-82ed8c659122',
          name: 'Evidence',
          desc: 'Description'
        },
        {
          evidence_id: '41e7d0a5-2772-4094-ad66-d85349366a34',
          name: 'Another Evidence',
          desc: 'Description'
        }
      ])
    
      await data.deleteData('evidence', 'cd5cd3a0-ae55-47a0-899e-82ed8c659122')
      await data.deleteData('evidence', '41e7d0a5-2772-4094-ad66-d85349366a34')
  })

  it('create a evidence when token is valid', async () => {
    const response = await server.post('/evidences', requestBody, requestOptions)

    expect(response.status).toBe(200)
    expect(response.data).toMatchObject({
      name: 'Some evidence',
      desc: 'Description'
    })

    await data.deleteData('evidence', response.data.evidence_id)
  })

  it('should return a error when create a error without token', async () => {
    await server.post('/skills', requestBody,
    { 
      headers: { 
        'Authorization': `Bearer wrong-token`,
        'Content-Type': 'application/json'
      }
    })
    .catch(error => {
      expect(error.response.status).toBe(401)
    })
  })
})