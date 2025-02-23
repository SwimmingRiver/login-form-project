import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    let user = request.user; // JwtStrategy를 통한 사용자 정보

    // JwtStrategy를 통해 user가 없으면 쿠키에서 refresh_token 추출
    if (!user) {
      const refreshToken = request.cookies['refresh_token'];
      if (!refreshToken) {
        throw new UnauthorizedException('Refresh token not found');
      }

      try {
        // refresh_token 검증 (비밀키는 환경변수에서 가져오기)
        user = jwt.verify(refreshToken, 'secretText');
      } catch (err) {
        throw new UnauthorizedException('Invalid refresh token');
      }
    }

    // 특정 필드를 요청한 경우 해당 필드 반환, 아니면 전체 user 반환
    return data ? user?.[data] : user;
  },
);
