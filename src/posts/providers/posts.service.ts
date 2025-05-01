import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../../users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { PostType } from '../enums/post-type.enum';
import { PostStatus } from '../enums/post-status.enum';
import { CreatePostsMetaOptionsDto } from '../dtos/create-posts-meta-options.dto';
import { PatchPostDto } from '../dtos/patch-posts.dto';

export interface IPost {
  id?: number;
  title: string;
  postType: PostType;
  content: string;
  slug: string;
  status: PostStatus;
  publishedOn: Date;
  schema: string;
  tags: string[];
  metaOptions: CreatePostsMetaOptionsDto[];
}

@Injectable()
export class PostsService {
  posts: IPost[] = [
    {
      id: 1,
      title: 'What is new in NestJs',
      postType: PostType.POST,
      content: 'Post Content, and this cool int e h processsss',
      slug: 'what-is-new-in-nestjs',
      status: PostStatus.DRAFT,
      publishedOn: new Date('2023-10-01T00:00:00.000Z'),
      schema:
        '{"version":1,"blocks":[{"type":"header","data":{"text":"Article Header","level":1}},{"type":"paragraph","data":{"text":"Article content paragraph"}}]}',
      tags: ['nestjs', 'typescript'],
      metaOptions: [
        {
          key: 'sideBarEnabled',
          value: true,
        },
      ],
    },
    {
      id: 2,
      title: 'How to integrate Swagger in nestjs',
      postType: PostType.POST,
      content:
        'Various configuration and patterns for setting swagger documentation in nestjs',
      slug: 'what-is-new-in-nestjs',
      status: PostStatus.DRAFT,
      publishedOn: new Date('2023-10-01T00:00:00.000Z'),
      schema:
        '{"version":1,"blocks":[{"type":"header","data":{"text":"Article Header","level":1}},{"type":"paragraph","data":{"text":"Article content paragraph"}}]}',
      tags: ['nestjs', 'typescript', 'swagger'],
      metaOptions: [
        {
          key: 'sideBarEnabled',
          value: true,
        },
      ],
    },
  ];

  constructor(private readonly userService: UsersService) {}

  findAll() {
    //const user = this.userService.findOneById(2);
    return this.posts;
  }

  findAllByUserId(userId: string): IPost {
    console.log(userId);
    return this.posts[0];
  }

  findOneById(id: number): IPost {
    const post = this.posts.find((post) => post.id === id);
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return post;
  }

  createPost(createPostDto: CreatePostDto): CreatePostDto {
    return createPostDto;
  }

  updatePost(patchPostDto: PatchPostDto) {
    console.log(patchPostDto);
  }
}
