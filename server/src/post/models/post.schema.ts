import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Post extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: Types.ObjectId;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  contents: string;
  @Prop({ default: false })
  isPublished: boolean;
  @Prop({ default: null })
  publishAt: Date | null;
}

export const PostSchema = SchemaFactory.createForClass(Post);
