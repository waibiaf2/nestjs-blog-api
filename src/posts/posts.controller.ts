import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { IPost, PostsService } from './providers/posts.service';
import { GetPostsParamsDto } from './dtos/get-posts-params.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-posts.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

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
    return this.postsService.createPost(createPostDto);
  }

  @Patch(':id')
  public updatePost(@Body() patchPostDto: PatchPostDto) {
    return this.postsService.updatePost(patchPostDto);
  }
}
