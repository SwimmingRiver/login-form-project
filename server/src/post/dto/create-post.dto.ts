import { IsBoolean, IsDateString, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;
  @IsString()
  contents: string;
  @IsBoolean()
  isPublished: boolean;
  @IsDateString()
  publishedAt: string;
}
