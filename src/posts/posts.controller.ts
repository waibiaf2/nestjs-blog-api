import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
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

  @Get('/users/:userId')
  public findAllUserPosts(@Param('userId', ParseIntPipe) userId: number) {
    return this.postsService.findAllByUserId(userId);
  }

  @Get(':id')
  public findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOneById(id);
  }

  @Patch(':id')
  public updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() patchPostDto: PatchPostDto,
  ) {
    return this.postsService.updatePost(id, patchPostDto);
  }

  @Delete()
  public deletePost(@Query('id', ParseIntPipe) id: number) {
    return this.postsService.deletePost(id);
  }
}
