import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from '../common/entities/Skill';
import { SkillService } from './service/skill.service';
import { SkillController } from './skill.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Skill])
  ],
  controllers: [
    SkillController
  ],
  providers: [
    SkillService,
    Logger
  ]
})
export class SkillModule {}
