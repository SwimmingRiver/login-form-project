import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 헤더에서 JWT 추출
      ignoreExpiration: false, // 만료된 토큰 거부
      secretOrKey: 'secretText', // .env 파일에 저장된 JWT 시크릿 키
    });
  }

  async validate(payload: any) {
    // JWT의 payload를 검증 후 사용자 정보 반환
    return { userId: payload.sub, username: payload.username };
  }
}
