import { Logger, Module } from '@nestjs/common';
import { RecordPeopleService } from './service/recordPeople.service';
import { RecordPeopleController } from './recordPeople.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordPeople } from '../common/entities/RecordPeople';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecordPeople])
  ],
  controllers: [
    RecordPeopleController
  ],
  providers: [
    RecordPeopleService,
    Logger
  ]
})
export class RecordPeopleModule {}
