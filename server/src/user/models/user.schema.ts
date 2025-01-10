import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
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
  @Prop({
    unique: true,
    required: true,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
