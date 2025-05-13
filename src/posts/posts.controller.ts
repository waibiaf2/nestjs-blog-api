import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query, Req,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-posts.dto';
import { GetPostsDto } from './dtos/get-posts.dto';
import { REQUEST_USER_KEY } from '../auth/constants/auth.constants';

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
  public createPost(@Req() request /*@Body() createPostDto: CreatePostDto*/) {
    console.log(request[REQUEST_USER_KEY]);
    /*return this.postsService.create(createPostDto);*/
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
  public async findAll(@Query() postQuery: GetPostsDto) {
    return await this.postsService.findAll(postQuery);
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
