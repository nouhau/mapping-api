import { Logger, Module } from '@nestjs/common';
import { EvaluatorNoteService } from './service/evaluatorNote.service';
import { EvaluatorNoteController } from './evaluatorNote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluatorNote } from '../common/entities/EvaluatorNote';
import { RecordPeopleService } from '../recordPeople/service/recordPeople.service';
import { RecordPeople } from '../common/entities/RecordPeople';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EvaluatorNote,
      RecordPeople
    ])
  ],
  controllers: [
    EvaluatorNoteController
  ],
  providers: [
    EvaluatorNoteService,
    RecordPeopleService,
    Logger
  ]
})
export class EvaluatorNoteModule {}
