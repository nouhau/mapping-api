import { Controller, Get, Post, Body, ValidationPipe, Logger, UseGuards } from '@nestjs/common';
import { SkillService } from './service/skill.service';
import { SkillRequest } from './dto/skillRequest.dto';
import { Skill } from '../common/entities/Skill';
import { AuthGuard } from '@nestjs/passport';

@Controller('skills')
export class SkillController {
  constructor(
    private readonly skillService: SkillService,
    private readonly logger: Logger = new Logger(SkillController.name)
    ) {}

  @UseGuards(AuthGuard('authAdmin'))
  @Post()
  createSkill(@Body(new ValidationPipe) body: SkillRequest): Promise<Skill> {
    this.logger.log(
      `Request received with with skill: ${body.name}`
    )

    return this.skillService.createSkill(body)
  }

  @Get()
  getAllSkill(): Promise<Skill[]> {
    this.logger.log(
      `Getting all skills`
    )

    return this.skillService.getAllSkill()
  }
}
