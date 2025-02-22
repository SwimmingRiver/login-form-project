import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './models/comment.schema';
import { CreateCommentDto } from './dto/CreateCommentDto';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { UpdateCommentDto } from './dto/UpdateCommentDto';

export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async create(createCommentDto: CreateCommentDto, authorId: string) {
    const newComment = new this.commentModel({
      ...createCommentDto,
      author: authorId,
    });
    return newComment.save();
  }
  async findByPost(postId: string): Promise<Comment[]> {
    return this.commentModel
      .find({ post: postId, isDeleted: false })
      .populate('author', 'username')
      .populate('parentComment')
      .exec();
  }
  async update(
    commentId: string,
    authorId: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const comment = await this.commentModel.findById(commentId);
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.author.toString() !== authorId)
      throw new ForbiddenException('You can only edit your own comments');

    comment.content = updateCommentDto.content;
    return comment.save();
  }

  async delete(commentId: string, authorId: string): Promise<void> {
    const comment = await this.commentModel.findByIdAndDelete(commentId);
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.author.toString() !== authorId)
      throw new ForbiddenException('You can only delete your own comments');

    await comment.save();
  }
}
