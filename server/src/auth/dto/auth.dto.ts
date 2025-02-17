import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  useremail: string;

  username?: string;

  @IsNotEmpty({ message: 'password is required' })
  password: string;
}
