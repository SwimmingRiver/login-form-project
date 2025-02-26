import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/models/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto): Promise<{
    accessToken: string;
    refreshToken: string;
    user: Partial<User>;
  }> {
    const { useremail, password } = loginDto;

    const user = await this.userModel.findOne({ useremail });
    if (!user) {
      throw new UnauthorizedException('no user');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('wrong password');
    }

    const payload = { sub: user._id, username: user.username };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        useremail: user.useremail,
        username: user.username,
      },
    };
  }

  async findOrCreate(loginDto: {
    useremail: string;
    username: string;
    password: string;
  }): Promise<User> {
    let user = await this.userModel.findOne({ useremail: loginDto.useremail });
    if (!user) {
      user = new this.userModel({
        useremail: loginDto.useremail,
        username: loginDto.username,
        password: loginDto.password,
      });
      await user.save();
    }

    return user;
  }
}
