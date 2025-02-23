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
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const tokens = await this.authService.login(loginDto);

    res
      .cookie('refresh_token', tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
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
    const token = req.headers.cookie?.split('=')[1];
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
  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) {
      return res.status(400).json({ message: 'No refresh token found' });
    }
    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    return res.status(200).json({ message: 'Logged out successfully' });
  }
  @Post('naver')
  async oAuth_naver(@Body('code') code: string, @Res() res) {
    try {
      const tokenResponse = await axios.post(
        'https://nid.naver.com/oauth2.0/token',
        null,
        {
          params: {
            grant_type: 'authorization_code',
            client_id: this.configService.get<string>(
              'NODE_ENV_NAVER_CLIENT_ID',
            ),
            client_secret: this.configService.get<string>(
              'NODE_ENV_NAVER_CLIENT_SECRET',
            ),
            code,
          },
        },
      );
      const { access_token } = tokenResponse.data;

      const userInfoResponse = await axios.get(
        'https://openapi.naver.com/v1/nid/me',
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
      const userInfo = userInfoResponse.data.response;

      const user = await this.authService.findOrCreate({
        useremail: userInfo.email,
        username: userInfo.nickname,
        password: '',
      });

      const accessToken = this.jwtService.sign({
        username: user.username,
        sub: user._id,
      });

      res
        .cookie('refresh_token', accessToken, {
          httpOnly: true,
          sameSite: 'strict',
        })
        .json({
          success: true,
          accessToken,
        });
      return res;
    } catch (error) {
      console.error(error);
    }
  }
}
