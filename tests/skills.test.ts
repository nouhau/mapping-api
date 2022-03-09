import { DataTest } from './utils/dataTest'
import { testServer } from './utils/testServer'

describe('/skills', () => {
  const data = new DataTest()
  const server = testServer()

  const requestBody = {
    name: 'Some skill',
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
  it('should return a array with skill', async () => {
    await data.createSkills()
    const dataReturn = []
    
    const response = await server.get('/skills')

    response.data.find( skill => {
      if(
        skill.skill_id === 'cd5cd3a0-ae55-47a0-899e-82ed8c659122' || 
        skill.skill_id === '41e7d0a5-2772-4094-ad66-d85349366a34'
      ) {
        dataReturn.push(skill)
      }
    })

    expect(dataReturn).toMatchObject([
        {
          skill_id: 'cd5cd3a0-ae55-47a0-899e-82ed8c659122',
          name: 'Skill',
          desc: 'Description'
        },
        {
          skill_id: '41e7d0a5-2772-4094-ad66-d85349366a34',
          name: 'Another Skill',
          desc: 'Description'
        }
      ])
    
      await data.deleteData('skill', 'cd5cd3a0-ae55-47a0-899e-82ed8c659122')
      await data.deleteData('skill', '41e7d0a5-2772-4094-ad66-d85349366a34')
  })

  it('create a skill when token is valid', async () => {
    const response = await server.post('/skills', requestBody, requestOptions)

    expect(response.status).toBe(200)
    expect(response.data).toMatchObject({
      name: 'Some skill',
      desc: 'Description'
    })

    await data.deleteData('skill', response.data.skill_id)
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
