import { Logger, Module } from '@nestjs/common';
import { EvidenceService } from './service/evidence.service';
import { EvidenceController } from './evidence.controller';
import { Evidence } from '../common/entities/Evidence';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Evidence])
  ],
  controllers: [
    EvidenceController
  ],
  providers: [
    EvidenceService,
    Logger
  ]
})
export class EvidenceModule {}
