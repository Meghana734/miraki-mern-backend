import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Blogs') // Groups these endpoints under "Blogs" in Swagger
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new blog' })
  @ApiBody({ type: CreateBlogDto })
  @ApiResponse({ status: 201, description: 'The blog has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.create(createBlogDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all blogs' })
  @ApiResponse({ status: 200, description: 'Return all blogs.' })
  findAll() {
    return this.blogsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single blog by ID' })
  @ApiParam({ name: 'id', description: 'ID of the blog', type: String })
  @ApiResponse({ status: 200, description: 'Return the blog.' })
  @ApiResponse({ status: 404, description: 'Blog not found.' })
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a blog by ID' })
  @ApiParam({ name: 'id', description: 'ID of the blog to update', type: String })
  @ApiBody({ type: UpdateBlogDto })
  @ApiResponse({ status: 200, description: 'The blog has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Blog not found.' })
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(id, updateBlogDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a blog by ID' })
  @ApiParam({ name: 'id', description: 'ID of the blog to delete', type: String })
  @ApiResponse({ status: 200, description: 'The blog has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Blog not found.' })
  remove(@Param('id') id: string) {
    return this.blogsService.remove(id);
  }
}
