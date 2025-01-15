import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './models/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { useremail, username, password } = createUserDto;
    const existingUser = await this.userModel.findOne({
      useremail: createUserDto.useremail,
    });
    if (existingUser) {
      throw new Error('이미 등록된 이메일입니다.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUserData = new this.userModel({
      useremail,
      username,
      password: hashedPassword,
    });

    return createUserData.save();
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
