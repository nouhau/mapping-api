import { Logger, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AdminStrategy } from './strategy/admin.strategy';
import { EvaluatorStrategy } from './strategy/evaluator.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule
  ],
  providers: [
    JwtStrategy,
    AdminStrategy,
    EvaluatorStrategy,
    Logger
  ]
})
export class AuthModule {}
