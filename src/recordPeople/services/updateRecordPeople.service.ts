import { getCustomRepository } from 'typeorm'
// import { RecordPeople } from '../../common/entities/RecordPeople'
import { LoggerService } from '../../common/LoggerService'
import { RecordPeopleRepository } from '../../common/repositories/recordPeople.repository'

interface IRecordPeople {
  recordPeopleRepository?: RecordPeopleRepository
  value: number
}

export class UpdateRecordPeopleService {
    private recordPeopleRepository: RecordPeopleRepository
    private value: number
    private logger: LoggerService = new LoggerService()

    constructor ({
      recordPeopleRepository = getCustomRepository(RecordPeopleRepository),
      value
    }: IRecordPeople) {
      this.recordPeopleRepository = recordPeopleRepository
      this.value = value
    }

    async execute (
      peopleId: string,
      evidenceId: string,
      average: number
    ) {
      console.log(this.value)
      this.logger.trace(
        'Creating evidence',
        this.constructor.name
      )
      return await this.recordPeopleRepository.updateRecord(peopleId, evidenceId, average)
    }
}
