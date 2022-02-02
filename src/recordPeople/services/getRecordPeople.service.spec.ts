import { getConnection } from 'typeorm'
import createConnection from '../../config/database'
import { getMockRecordPeople } from '../../__mocks__/mockRecordPeople'
import { GetRecordPeopleService } from './getRecordPeople.service'

jest.mock('../../common/repositories/recordPeople.repository')

const recordPeopleMockRepository = require('../../common/repositories/recordPeople.repository')
const getRecordPeopleService = new GetRecordPeopleService(recordPeopleMockRepository)

describe('GetRecordPeople', () => {
  const recordPeopleMock = getMockRecordPeople()

  beforeEach(async () => {
    await createConnection()
  })

  afterEach(async () => {
    const connection = getConnection()
    await connection.close()
  })

  it('get main evaluation matrix', async () => {
    recordPeopleMockRepository.getRecord = jest.fn()
      .mockImplementation(() => Promise.resolve([recordPeopleMock]))

    const recordPeople = await getRecordPeopleService.execute()
    expect(recordPeople).toMatchObject([recordPeopleMock])
  })
})
