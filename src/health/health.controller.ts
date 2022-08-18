import { Controller, Get, Logger } from '@nestjs/common';

@Controller('health')
export class HealthController {
  constructor(
    private readonly logger: Logger = new Logger(HealthController.name),
  ) {}

  @Get()
  health() {
    this.logger.log('Checking app status');

    return {
      version: process.env.npm_package_version || 'unknown',
      uptime: process.uptime(),
      datetime: new Date(),
    };
  }
}