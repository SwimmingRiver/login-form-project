import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class User extends Document {
  @Prop({
    unique: true,
    required: true,
  })
  useremail: string;
  @Prop({
    unique: true,
    required: true,
  })
  username: string;
  @Prop()
  password?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
