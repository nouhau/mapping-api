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

    const recordPeople = await recordPeopleRepository.getRecord(recordPeopleMock.people_id)
    expect(recordPeople).toMatchObject([recordPeopleMock])
  })

  it('should call methor updateRecord and return affected rows', async () => {
    const managerMock = await getManagerMock({
      updateReturn: {
        affected: 1
      }
    })

    const recordPeopleRepository = new RecordPeopleRepository(managerMock)

    const updateRecordPeople = await recordPeopleRepository.updateRecord(
      recordPeopleMock.people_id,
      recordPeopleMock.evidence_id,
      recordPeopleMock.average
    )
    expect(updateRecordPeople).toMatchObject({
      affected: 1
    })
  })
})
