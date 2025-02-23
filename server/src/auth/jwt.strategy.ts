import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // ✅ 1. Authorization 헤더에서 추출
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        // ✅ 2. 쿠키에서 추출
        (req: Request) => {
          let token = null;
          if (req && req.cookies) {
            token = req.cookies['refresh_token']; // 쿠키에서 refresh_token 추출
          }
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: 'secretText', // ✅ 실제 환경에서는 .env에서 불러오세요
    });
  }

  async validate(payload: any) {
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }

    // ✅ JWT payload를 바탕으로 사용자 정보 반환
    return { userId: payload.sub, username: payload.username };
  }
}
