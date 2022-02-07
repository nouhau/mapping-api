import mockConnection from '../../__mocks__/mockConnection'
import { UpdateRecordPeopleService } from './updateRecordPeople.service'

jest.mock('../../common/repositories/recordPeople.repository')

const recordPeopleMockRepository = require('../../common/repositories/recordPeople.repository')

describe('UpdateRecordPeople', () => {
  let updateRecordPeopleService

  beforeEach(async () => {
    await mockConnection.create()
    updateRecordPeopleService = new UpdateRecordPeopleService({
      recordPeopleRepository: recordPeopleMockRepository,
      value: 1
    })
  })

  afterEach(async () => {
    await mockConnection.clear()
  })

  it('update recordPeople', async () => {
    recordPeopleMockRepository.updateRecord = jest.fn()
      .mockImplementation(() => Promise.resolve({
        affected: 1
      }))

    const updateRecordPeople = await updateRecordPeopleService.execute()
    expect(updateRecordPeople).toMatchObject({
      affected: 1
    })
  })
})
