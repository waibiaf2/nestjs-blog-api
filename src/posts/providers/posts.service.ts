import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';

export interface IPost {
  id: number;
  title: string;
  content: string;

  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
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
    const user = this.userService.findOneById(2);

    this.posts = [
      {
        id: 1,
        title: 'Post 1',
        content: 'Content of post 1',
        user,
      },
      {
        id: 2,
        title: 'Post 2',
        content: 'Content of post 2',
        user,
      },
    ];

    return this.posts;
  }

  findAllByUserId(userId: string) {
    console.log(userId);
    return this.posts;
  }

  findOneById(id: number) {
    return this.posts.find((post) => post.id === id);
  }

  createPost(createPostDto: CreatePostDto): CreatePostDto {
    return createPostDto;
  }
}
