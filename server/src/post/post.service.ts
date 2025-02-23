import { InjectModel } from '@nestjs/mongoose';
import { Post } from './models/post.schema';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { UpdatePostDto } from './dto/update-post.dto';

export class PostService {
  constructor(
    @InjectModel(Post.name)
    private postModel: Model<Post>,
  ) {}
  async create(createPostDto: CreatePostDto, authorId: string): Promise<Post> {
    const newPost = new this.postModel({ ...createPostDto, author: authorId });
    return newPost.save();
  }
  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      this.postModel
        .find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('author', 'username')
        .exec(),

      this.postModel.countDocuments(),
    ]);

    return {
      data: posts,
      totalItems: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }
  async findOne(id: string): Promise<Post> {
    const post = await this.postModel
      .findById(id)
      .populate('author', 'username');
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async update(
    id: string,
    userId: string,
    updatePostDto: UpdatePostDto,
  ): Promise<Post> {
    const updatedPost = await this.postModel.findByIdAndUpdate(
      id,
      updatePostDto,
      { new: true },
    );
    const post = await this.postModel.findById(id);

    if (post.author.toString() !== userId) {
      throw new ForbiddenException('You are not allowed to edit this post');
    }
    if (!updatedPost) throw new NotFoundException('Post not found');
    return updatedPost;
  }
  async remove(id: string, userId: string): Promise<void> {
    const post = await this.postModel.findById(id);
    if (post.author.toString() !== userId) {
      throw new ForbiddenException('You are not allowed to delete this post');
    }
    const result = await this.postModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Post not found');
  }
}
