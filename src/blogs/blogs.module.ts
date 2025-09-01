import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './model/blogs.model';

@Module({
  controllers: [BlogsController],
  providers: [BlogsService],
  imports: [MongooseModule.forFeature([{name:Blog.name,schema:BlogSchema}])]
})
export class BlogsModule {}
