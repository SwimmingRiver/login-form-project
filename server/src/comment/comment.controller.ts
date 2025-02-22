import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/CreateCommentDto';
import { UpdateCommentDto } from './dto/UpdateCommentDto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @Request() req) {
    const authorId = req.user.userId;
    return this.commentService.create(createCommentDto, authorId);
  }
  @Get('post/:postId')
  findByPost(@Param('postId') postId: string) {
    return this.commentService.findByPost(postId);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Request() req,
  ) {
    const authorId = req.user.userId;
    return this.commentService.update(id, authorId, updateCommentDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Request() req) {
    const authorId = req.user.userId;
    return this.commentService.delete(id, authorId);
  }
}
