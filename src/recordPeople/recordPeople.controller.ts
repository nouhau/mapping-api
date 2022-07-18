import { Controller, Get, Logger, Param } from '@nestjs/common';
import { RecordPeople } from '../common/entities/RecordPeople';
import { RecordPeopleService } from './service/recordPeople.service';

@Controller('records')
export class RecordPeopleController {
  constructor(
    private readonly logger: Logger = new Logger(RecordPeopleService.name),
    private readonly recordPeopleService: RecordPeopleService
    ) {}

  @Get(':peopleId')
  getRecordPeople(@Param('peopleId') peopleId: string): Promise<RecordPeople[]> {
    this.logger.log(
      `Getting records for ${peopleId}`
    )

    return this.recordPeopleService.getRecordPeople(peopleId)
  }
}
