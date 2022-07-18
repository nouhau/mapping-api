import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from '../../common/entities/Skill';
import { SkillService } from './skill.service';
import { getMockSkillRequest } from '../../__mocks__/mockSkillRequest'
import { randomUUID } from 'crypto';

describe('SkillService', () => {
  let service: SkillService;
  let mockLogger: Logger;
  let mockSkillRepository: Repository<Skill>

  const SKILL_REPOSITORY_TOKEN = getRepositoryToken(Skill)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SkillService,
        {
          provide: SKILL_REPOSITORY_TOKEN,
          useValue: {
            save: jest.fn(),
            find: jest.fn()
          }
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

    service = module.get<SkillService>(SkillService);
    mockLogger = module.get<Logger>(Logger)
    mockSkillRepository = module.get<Repository<Skill>>(SKILL_REPOSITORY_TOKEN)
  });

  it('should return a new skill', async () => {
    const mockSkillRequest = getMockSkillRequest()
    const mockSkillReturn = {
      ...mockSkillRequest,
      skill_id: randomUUID().toString()
    }

    jest.spyOn(mockSkillRepository, 'save').mockImplementation(() => Promise.resolve(mockSkillReturn))

    const skill = await service.createSkill(mockSkillRequest)
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Creating skill: ${mockSkillRequest.name}`
    )
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Skill created ${mockSkillReturn.skill_id}`
    )
    expect(skill.skill_id).toBeDefined()
    expect(skill).toMatchObject({
      name: 'string',
      desc: 'desc string'
    })
  });

  it('should return a array with all skills', async () => {
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

    jest.spyOn(mockSkillRepository, 'find').mockImplementation(() => Promise.resolve(mockSkillsReturn))

    const skills = await service.getAllSkill()
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Getting skills`
    )
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Get ${mockSkillsReturn.length} skills`
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
  })
});
