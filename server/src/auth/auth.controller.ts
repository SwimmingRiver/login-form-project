import {
  Body,
  Controller,
  Post,
  Res,
  Req,
  UnauthorizedException,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const tokens = await this.authService.login(loginDto);
    res
      .cookie('refresh_token', tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })
      .send({ accessToken: tokens.accessToken, user: tokens.user });
  }
  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies['refresh_token'];

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: 'secret_text',
      });
      const newAccessToken = this.jwtService.sign({
        useremail: payload.email,
        sub: payload.sub,
      });
      res.send({ accessToken: newAccessToken });
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
  //TODO: 엔드포인트 명명 고민하기
  @Get('me')
  async fetchMyUserData(@Req() req: Request, @Res() res: Response) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      const decoded = this.jwtService.verify(token);
      return res.status(200).json({ user: decoded });
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
