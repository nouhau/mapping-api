import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let controller: HealthController;
  let mockLogger: Logger;

  beforeEach(async () => {
    process.env.npm_package_version = '0.0.1';
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    mockLogger = module.get<Logger>(Logger);
  });

  it('should be send a message with app status', () => {
    const response = controller.health();
    expect(mockLogger.log).toHaveBeenCalledWith('Checking app status');
    expect(response).toMatchObject(
      expect.objectContaining({
        version: expect.any(String),
        uptime: expect.any(Number),
        datetime: expect.any(Date),
      }),
    );
  });
});
