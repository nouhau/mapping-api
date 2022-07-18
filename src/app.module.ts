import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { SkillModule } from './skill/skill.module';
import { AuthModule } from './auth/auth.module';
import { EvidenceModule } from './evidence/evidence.module';
import { MatrixModule } from './matrix/matrix.module';
import { EvaluationMatrixModule } from './evaluationMatrix/evaluationMatrix.module';
import { EvaluatorNoteModule } from './evaluatorNote/evaluatorNote.module';
import { RecordPeopleModule } from './recordPeople/recordPeople.module';
import { MappingModule } from './mapping/mapping.module';
import { MappingNoteModule } from './mappingNote/mappingNote.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig), 
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(5000)
        })
      }), 
    SkillModule,
    AuthModule,
    EvidenceModule,
    MatrixModule,
    EvaluationMatrixModule,
    EvaluatorNoteModule,
    RecordPeopleModule,
    MappingModule,
    MappingNoteModule
  ]
})
export class AppModule {}
