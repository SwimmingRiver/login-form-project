import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail()
  useremail: string;

  @IsNotEmpty({ message: 'password is required' })
  password: string;
}
