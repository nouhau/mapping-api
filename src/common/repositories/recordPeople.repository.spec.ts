import getManagerMock from '../../__mocks__/getEntityManagerMock'
import { getMockRecordPeople } from '../../__mocks__/mockRecordPeople'
import { RecordPeopleRepository } from './recordPeople.repository'

describe('RecordPeopleRepository', () => {
  const recordPeopleMock = getMockRecordPeople()

  it('should call getRecord method and return recordPeople array', async () => {
    const managerMock = await getManagerMock({
      findReturn: [recordPeopleMock]
    })

    const recordPeopleRepository = new RecordPeopleRepository(managerMock)

    const recordPeople = await recordPeopleRepository.getRecord()
    expect(recordPeople).toMatchObject([recordPeopleMock])
  })
})
