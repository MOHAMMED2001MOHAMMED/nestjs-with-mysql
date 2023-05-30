import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy,VerifiedCallback } from 'passport-jwt';
import { Payload } from './payload';
import { AuthService } from './auth.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(private authService: AuthService){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'Test',
    });
  }

  async validate(payload:Payload, done:VerifiedCallback){
    const user = this.authService.validate(payload);
    if(!user){
     return done(new HttpException('Unathorized access', HttpStatus.UNAUTHORIZED))
    }
    return done(null,user)
  }
}