import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mapping } from '../common/entities/Mapping';
import { MappingService } from './service/mapping.service';
import { MappingController } from './mapping.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mapping])
  ],
  providers: [
    MappingService,
    Logger
  ],
  controllers: [MappingController]
})
export class MappingModule {}
