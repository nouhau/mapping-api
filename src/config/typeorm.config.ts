import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions
} from '@nestjs/typeorm';
import { EvaluationMatrix } from '../common/entities/EvaluationMatrix';
import { EvaluatorNote } from '../common/entities/EvaluatorNote';
import { Evidence } from '../common/entities/Evidence';
import { Mapping } from '../common/entities/Mapping';
import { MappingNote } from '../common/entities/MappingNote';
import { Matrix } from '../common/entities/Matrix';
import { RecordPeople } from '../common/entities/RecordPeople';
import { Skill } from '../common/entities/Skill';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      type: 'postgres',
      host: configService.get('DATABASE_HOST'),
      port: configService.get('DATABASE_PORT'),
      username: configService.get('DATABASE_USER'),
      password: configService.get('DATABASE_PASSWORD'),
      database: configService.get('DATABASE_NAME'),
      //  ssl: {
    //      rejectUnauthorized: false
      //  },
      entities: [
        EvaluationMatrix,
        EvaluatorNote,
        Evidence,
        Mapping,
        MappingNote,
        Matrix,
        RecordPeople,
        Skill
      ],
      migrations: [
        '../common/migrations/*.{js,ts}'
      ],
      logging: true
    };
  }
};
