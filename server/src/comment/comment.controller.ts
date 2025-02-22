import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/CreateCommentDto';
import { UpdateCommentDto } from './dto/UpdateCommentDto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.gurad';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createCommentDto: CreateCommentDto,
    @GetUser('userId') userId: string,
  ) {
    return this.commentService.create(createCommentDto, userId);
  }
  @Get('post/:postId')
  findByPost(@Param('postId') postId: string) {
    return this.commentService.findByPost(postId);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @GetUser('userId') userId: string,
  ) {
    return this.commentService.update(id, userId, updateCommentDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string, @GetUser('userId') userId: string) {
    return this.commentService.delete(id, userId);
  }
}
