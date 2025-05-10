import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './providers/posts.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { TagsModule } from '../tags/tags.module';
import { PaginationModule } from '../common/pagination.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    UsersModule,
    PaginationModule,
    TypeOrmModule.forFeature([Post]),
    TagsModule,
  ],
})
export class PostsModule {}
