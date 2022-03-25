import { getCustomRepository } from 'typeorm'
import { LoggerService } from '../../common/LoggerService'
import { RecordPeopleRepository } from '../../common/repositories/recordPeople.repository'

interface IRecordPeople {
  recordPeopleRepository?: RecordPeopleRepository
}

export class UpdateRecordPeopleService {
    private recordPeopleRepository: RecordPeopleRepository
    private logger: LoggerService = new LoggerService()

    constructor ({
      recordPeopleRepository = getCustomRepository(RecordPeopleRepository)
    }: IRecordPeople) {
      this.recordPeopleRepository = recordPeopleRepository
    }

    async execute (
      peopleId: string,
      evidenceId: string,
      average: number
    ) {
      this.logger.trace(
        'Creating evidence',
        this.constructor.name
      )
      return await this.recordPeopleRepository.updateRecord(peopleId, evidenceId, average)
    }
}
