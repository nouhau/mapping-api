import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordPeople } from '../../common/entities/RecordPeople';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateRecordPeopleRequest } from '../dto/updateRecordPeopleRequest.dto';

@Injectable()
export class RecordPeopleService {

  constructor(
    private readonly logger: Logger = new Logger(RecordPeopleService.name),
    @InjectRepository(RecordPeople) private recordPeopleRepository: Repository<RecordPeople>
  ) {}
  
  updateRecordPeople = async (updateRecordPeopleRequest: UpdateRecordPeopleRequest): Promise<{ affected: number }> => {
    this.logger.log(
      `Updaating recordPeople: ${JSON.stringify(updateRecordPeopleRequest)}`
    )
    
    const updateRecord: UpdateResult = await this.recordPeopleRepository.update({
      people_id: updateRecordPeopleRequest.peopleId,
      evidence_id: updateRecordPeopleRequest.evidenceId
    },
    {
      average: updateRecordPeopleRequest.average
    })

    return {
      affected: updateRecord.affected
    }
  }
  
  getRecordPeople = async (peopleId: string): Promise<RecordPeople[]> => {
    this.logger.log(
      `Getting recordPeople from ${peopleId}`
    )

    const recordPeople: RecordPeople[] = await this.recordPeopleRepository.find(
      {
        where: {
          people_id: peopleId
        },
        relations: ['evidenceId']
      }
    )

    this.logger.log(
      `Total records from ${peopleId}: ${recordPeople.length}`
    )

    return recordPeople
  }
}
