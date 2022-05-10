import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';


interface payloadInterface {
  email: string,
  personId: string,
  sub: string,
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

  //Verificação jwt
  async validate(payload: payloadInterface) {
    return { id: payload.sub, email: payload.email, personId: payload.personId };
  
  };
}