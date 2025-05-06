import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-posts.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({
    summary: 'Create a new blog post',
    description: 'Create a new post with the given data',
  })
  @ApiResponse({
    status: 201,
    description: 'You get a 201 response is your post is create successfully.',
  })
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @ApiOperation({
    summary: 'Get all blog posts',
    description: 'Get all posts with the given data',
  })
  @ApiResponse({
    status: 200,
    description: 'You get a 200 response is your post is create successfully.',
  })
  @Get()
  public findAll() {
    return this.postsService.findAll();
  }

  @ApiOperation({
    summary: 'Get all blog posts by user id',
    description: 'Get all posts with the given user id',
  })
  @ApiResponse({
    status: 200,
    description: 'You get a 200 response is your post is create successfully.',
  })
  @Get('/users/:userId')
  public findAllUserPosts(@Param('userId', ParseIntPipe) userId: number) {
    return this.postsService.findAllByUserId(userId);
  }

  @ApiOperation({
    summary: 'Get a blog post by id',
    description: 'Get a post with the given id',
  })
  @ApiResponse({
    status: 200,
    description: 'You get a 200 response is your post is create successfully.',
  })
  @Get(':id')
  public findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOneById(id);
  }

  @ApiOperation({
    summary: 'Update a blog post by id',
    description: 'Update a post with the given id',
  })
  @ApiResponse({
    status: 200,
    description: 'You get a 200 response is your post is create successfully.',
  })
  @Patch()
  public updatePost(@Body() patchPostDto: PatchPostDto) {
    return this.postsService.update(patchPostDto);
  }

  @ApiOperation({
    summary: 'Delete a blog post by id',
    description: 'Delete a post with the given id',
  })
  @ApiResponse({
    status: 200,
    description: 'You get a 200 response is your post is create successfully.',
  })
  @Delete(':id')
  public deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.deletePost(id);
  }
}
