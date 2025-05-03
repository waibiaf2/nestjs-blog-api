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
import { GetPostsParamsDto } from './dtos/get-posts-params.dto';
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
  public findAllUserPosts(@Param('userId') userId: string) {
    console.log(this.postsService.findAllByUserId(userId));
    return 'These are my posts';
  }

  @Get(':id')
  public findOneById(@Param() getPostsPrams: GetPostsParamsDto) {
    return this.postsService.findOneById(getPostsPrams.id);
  }

  @Patch(':id')
  public updatePost(@Body() patchPostDto: PatchPostDto) {
    return this.postsService.updatePost(patchPostDto);
  }

  @Delete()
  public deletePost(@Query('id', ParseIntPipe) id: number) {
    return this.postsService.deletePost(id);
  }
}
