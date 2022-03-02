import mockConnection from '../../__mocks__/mockConnection'
import { getMockRecordPeople } from '../../__mocks__/mockRecordPeople'
import { GetRecordPeopleService } from './getRecordPeople.service'

jest.mock('../../common/repositories/recordPeople.repository')

const recordPeopleMockRepository = require('../../common/repositories/recordPeople.repository')
const getRecordPeopleService = new GetRecordPeopleService(recordPeopleMockRepository)

describe('GetRecordPeople', () => {
  const recordPeopleMock = getMockRecordPeople()

  beforeEach(async () => {
    await mockConnection.create()
  })

  afterEach(async () => {
    await mockConnection.clear()
  })

  it('get recordPeople', async () => {
    recordPeopleMockRepository.getRecord = jest.fn()
      .mockImplementation(() => Promise.resolve([recordPeopleMock]))

    const recordPeople = await getRecordPeopleService.execute(recordPeopleMock.people_id)
    expect(recordPeople).toMatchObject([recordPeopleMock])
  })
})
