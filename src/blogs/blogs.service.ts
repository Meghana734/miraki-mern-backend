import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './model/blogs.model';
import { Model, Types } from 'mongoose';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<BlogDocument>,
  ) {}

  private validateObjectId(id: string): void {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ObjectId: ${id}`);
    }
  }

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    try {
      return await this.blogModel.create(createBlogDto);
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to create blog');
    }
  }

  async findAll(): Promise<Blog[]> {
    return this.blogModel.find().exec();
  }

  async findOne(id: string): Promise<Blog> {
    this.validateObjectId(id);
    const blog = await this.blogModel.findById(id).exec();
    if (!blog) {
      throw new NotFoundException(`Blog with ID "${id}" not found`);
    }
    return blog;
  }

  async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    this.validateObjectId(id);
    const updatedBlog = await this.blogModel
      .findByIdAndUpdate(id, updateBlogDto, { new: true, runValidators: true })
      .exec();

    if (!updatedBlog) {
      throw new NotFoundException(`Blog with ID "${id}" not found`);
    }
    return updatedBlog;
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    this.validateObjectId(id);
    const deletedBlog = await this.blogModel.findByIdAndDelete(id).exec();

    if (!deletedBlog) {
      throw new NotFoundException(`Blog with ID "${id}" not found`);
    }
    return { deleted: true };
  }
}
