import { Controller, Post, Body, Logger, UseGuards, ValidationPipe, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Evidence } from 'src/common/entities/Evidence';
import { EvidenceRequest } from './dto/evidenceRequest.dto';
import { EvidenceService } from './service/evidence.service';

@Controller('evidences')
export class EvidenceController {
  constructor(
    private readonly evidenceService: EvidenceService,
    private readonly logger: Logger = new Logger(EvidenceController.name)
  ) {}

  @UseGuards(AuthGuard('authAdmin'))
  @Post()
  createEvidence(@Body(new ValidationPipe) body: EvidenceRequest): Promise<Evidence> {
    this.logger.log(
      `Request received with with evidence: ${body.name}`
    )

    return this.evidenceService.createEvidence(body)
  }

  @Get()
  getAllEvidence(): Promise<Evidence[]> {
    this.logger.log(
      `Getting all evidences`
    )

    return this.evidenceService.getAllEvidence()
  }
}
