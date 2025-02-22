import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment {
  @Prop({ type: Types.ObjectId, ref: 'Post', required: true })
  post: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: Types.ObjectId;
  @Prop({ required: true })
  content: string;
  @Prop({ type: Types.ObjectId, ref: 'Comment', default: null })
  parentComment: Types.ObjectId | null;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
