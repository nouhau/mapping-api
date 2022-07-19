import { Logger, Module } from '@nestjs/common';
import { MappingNoteService } from './service/mappingNote.service';
import { MappingNoteController } from './mappingNote.controller';
import { MappingService } from '../mapping/service/mapping.service';
import { MappingNote } from '../common/entities/MappingNote';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordPeopleService } from '../recordPeople/service/recordPeople.service';
import { EvaluationMatrixService } from '../evaluationMatrix/service/evaluationMatrix.service';
import { RecordPeople } from '../common/entities/RecordPeople';
import { EvaluationMatrix } from '../common/entities/EvaluationMatrix';
import { Mapping } from '../common/entities/Mapping';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MappingNote,
      Mapping,
      RecordPeople,
      EvaluationMatrix
    ])
  ],
  controllers: [
    MappingNoteController
  ],
  providers: [
    MappingNoteService,
    Logger,
    MappingService,
    RecordPeopleService,
    EvaluationMatrixService
  ]
})
export class MappingNoteModule {}
