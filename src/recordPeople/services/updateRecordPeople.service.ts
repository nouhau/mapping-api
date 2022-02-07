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
    // private recordPeople: RecordPeople
    private value: number
    private logger: LoggerService = new LoggerService()

    constructor ({
      recordPeopleRepository = getCustomRepository(RecordPeopleRepository),
      // peopleEmail: string,
      // evidenceId: string,
      value
    }: IRecordPeople) {
      this.recordPeopleRepository = recordPeopleRepository
      this.value = value
      // this.recordPeople = new RecordPeople(peopleEmail, evidenceId, value)
    }

    async execute () {
      console.log(this.value)
      this.logger.trace(
        'Creating evidence',
        this.constructor.name
      )
      return await this.recordPeopleRepository.updateRecord()
    }
}
