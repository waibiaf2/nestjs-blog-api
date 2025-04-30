import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IPost, PostsService } from './providers/posts.service';
import { GetPostsParamsDto } from './dtos/get-posts-params.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  public findAll(): IPost[] {
    return this.postsService.findAll();
  }

  @Get(':userId')
  public findAllUserPosts(@Param('userId') userId: string) {
    return this.postsService.findAllByUserId(userId);
  }

  @Get(':id')
  public findOneById(@Param() getPostsPrams: GetPostsParamsDto) {
    return this.postsService.findOneById(getPostsPrams.id);
  }

  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }
}
