import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserModel } from '../model/user.model';

@Injectable()
export class EvaluatorStrategy extends PassportStrategy(Strategy, 'authEvaluator') {
  constructor(
    private readonly logger: Logger = new Logger(EvaluatorStrategy.name),
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.TOKEN,
    });
  }

  async validate(payload: UserModel): Promise<UserModel> {
    this.logger.log( 
      `Validating user ${payload.user_id}`
    )

    if(payload.role !== 'admin' && payload.role !== 'evaluator') {
      this.logger.error(
        `Unauthorized user ${payload.user_id}, role: ${payload.role}`
      )
      throw new UnauthorizedException()
    }

    return payload
  }
}
