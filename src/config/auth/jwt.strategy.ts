import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

interface payloadInterface {
    username: string,
    sub: string,
    personId: string,
    iat: number,
    exp: number
  }
  
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: payloadInterface) {
    
    return { userId: payload.sub, username: payload.username, personId: payload.personId };
  }
}