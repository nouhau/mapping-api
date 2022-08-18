import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from '../src/common/entities/Skill';
import { SkillModule } from '../src/skill/skill.module';
import { typeOrmAsyncConfig } from '../src/config/typeorm.config';

describe('UserController (e2e)', () => {
  jest.setTimeout(10000)
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeOrmAsyncConfig),
        SkillModule
      ],
    })
    .overrideProvider(getRepositoryToken(Skill))
    .useFactory({
      factory: () => ({
        save: jest.fn().mockImplementation(() => Promise.resolve([{
          skill_id: '12345',
          name: 'skill',
          desc: 'desc'
        }]))
      })
    })
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/skills')
      .expect(200)
      .then(response => console.log(response.body))
  });
});
