import { getCustomRepository } from 'typeorm'
import { RecordPeople } from '../../common/entities/RecordPeople'
import { LoggerService } from '../../common/LoggerService'
import { RecordPeopleRepository } from '../../common/repositories/recordPeople.repository'

export class GetRecordPeopleService {
    private recordPeopleRepository: RecordPeopleRepository
    private logger: LoggerService = new LoggerService()

    constructor (
      recordPeopleRepository: RecordPeopleRepository = getCustomRepository(RecordPeopleRepository)) {
      this.recordPeopleRepository = recordPeopleRepository
    }

    async execute (peopleId: string): Promise<RecordPeople[]> {
      this.logger.trace(
        'Getting record people',
        this.constructor.name
      )
      return await this.recordPeopleRepository.getRecord(peopleId)
    }
}
