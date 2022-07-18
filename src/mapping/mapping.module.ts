import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mapping } from '../common/entities/Mapping';
import { MappingService } from './mapping.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mapping])
  ],
  providers: [
    MappingService,
    Logger
  ]
})
export class MappingModule {}
