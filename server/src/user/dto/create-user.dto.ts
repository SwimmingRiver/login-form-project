import { IsString, Matches, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  useremail: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only accept english and number',
  })
  password: string;
}
