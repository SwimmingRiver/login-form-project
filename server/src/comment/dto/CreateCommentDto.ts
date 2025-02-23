import { IsString, IsNotEmpty, IsOptional, IsMongoId } from 'class-validator';

export class CreateCommentDto {
  @IsMongoId()
  post: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsMongoId()
  @IsOptional()
  parentComment?: string;
}
