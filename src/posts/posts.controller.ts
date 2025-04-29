import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { GetPostsParamsDto } from './get-posts-params.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  public findAll() {
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
}
