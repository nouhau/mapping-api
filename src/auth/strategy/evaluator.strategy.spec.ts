import { Logger, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getMockUserModel } from '../../__mocks__/mockUserModel';
import { EvaluatorStrategy } from './evaluator.strategy'

describe('EvaluatorStrategy', () => {
  let service: EvaluatorStrategy;
  let mockLogger: Logger;

  beforeEach(async () => {
    process.env.TOKEN = 'somesecret'
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvaluatorStrategy,
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
            error: jest.fn()
          }
        }
      ]
    }).compile();

    service = module.get<EvaluatorStrategy>(EvaluatorStrategy);
    mockLogger = module.get<Logger>(Logger)
  });

  it('should be return a user, when user have role admin', async () => {
    const mockUser = getMockUserModel({})
    const user = await service.validate(mockUser)
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Validating user ${mockUser.user_id}`
    )
    expect(user).toMatchObject(mockUser)
  })

  it('should be return a user, when user have role evaluator', async () => {
    const mockUser = getMockUserModel({
      role: 'evaluator'
    })
    const user = await service.validate(mockUser)
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Validating user ${mockUser.user_id}`
    )
    expect(user).toMatchObject(mockUser)
  })

  it('should be return a error, when user does not have role admin', async () => {
    const mockUser = getMockUserModel({
      role: 'student'
    })
    await expect (service.validate(mockUser)).rejects.toThrow(
      new UnauthorizedException()
    )
    expect(mockLogger.error).toHaveBeenCalledWith(
      `Unauthorized user ${mockUser.user_id}, role: ${mockUser.role}`
    )
  })
});
