import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
@Schema({ collection: 'blogs-blog', timestamps: true })
export class Blog {
  @Prop({ type: String, required: true })
  title: string;
  @Prop({ type: String, required: true })
  author: string;
  @Prop({ type: String, required: true })
  content: string;
  @Prop({ type: String, required: false })
  email?: string;
  @Prop({ type: String, required: false })
  phonenumber?: String;
}
export type BlogDocument = Blog & Document;
export const BlogSchema = SchemaFactory.createForClass(Blog)
