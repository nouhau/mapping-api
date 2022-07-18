import 'dotenv/config'
import { DataSource } from 'typeorm';
import { EvaluationMatrix } from './src/common/entities/EvaluationMatrix'
import { EvaluatorNote } from './src/common/entities/EvaluatorNote'
import { Evidence } from './src/common/entities/Evidence';
import { Mapping } from './src/common/entities/Mapping'
import { MappingNote } from './src/common/entities/MappingNote'
import { Matrix } from './src/common/entities/Matrix'
import { RecordPeople } from './src/common/entities/RecordPeople'
import { Skill } from './src/common/entities/Skill';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  database: process.env.DB_NAME,
  password: process.env.DATABASE_PASSWORD,
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
})

export default dataSource;
