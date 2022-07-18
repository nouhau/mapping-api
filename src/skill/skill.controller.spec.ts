import { Test, TestingModule } from '@nestjs/testing';
import { SkillController } from './skill.controller';
import { SkillService } from './service/skill.service';
import { Logger } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Skill } from '../common/entities/Skill';
import { getMockSkillRequest } from '../__mocks__/mockSkillRequest';
import { randomUUID } from 'crypto';

describe('SkillController', () => {
  let controller: SkillController;
  let mockSkillService: SkillService;
  let mockLogger: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkillController],
      providers: [
        SkillService,
        {
          provide: getRepositoryToken(Skill),
          useValue: {}
        },
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
            error: jest.fn()
          }
        }
      ],
    }).compile();

    controller = module.get<SkillController>(SkillController);
    mockSkillService = module.get<SkillService>(SkillService);
    mockLogger = module.get<Logger>(Logger);
  });

  it('should return a new skill', async () => {
    const mockSkillRequest = getMockSkillRequest()
    const mockSkillReturn = {
      ...mockSkillRequest,
      skill_id: randomUUID().toString()
    }

    jest.spyOn(mockSkillService, 'createSkill').mockImplementation(() => Promise.resolve(mockSkillReturn))
    const response = await controller.createSkill(mockSkillRequest)
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Request received with with skill: ${mockSkillRequest.name}`
    )
    expect(response.skill_id).toBeDefined()
    expect(response).toMatchObject({
      name: 'string',
      desc: 'desc string'
    })
  });

  it('should return all skills', async () => {
    const mockSkillsReturn = [
      {
        ...getMockSkillRequest(),
        skill_id: randomUUID().toString()
      },
      {
        ...getMockSkillRequest('another', 'desc'),
        skill_id: randomUUID().toString()
      }
    ]

    jest.spyOn(mockSkillService, 'getAllSkill').mockImplementation(() => Promise.resolve(mockSkillsReturn))

    const skills = await controller.getAllSkill()
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Getting all skills`
    )
    skills.forEach(skill => expect(skill.skill_id).toBeDefined())    
    expect(skills).toMatchObject([
      {
        name: 'string',
        desc: 'desc string'
      },
      {
        name: 'another',
        desc: 'desc'
      }
    ])
  });
});
