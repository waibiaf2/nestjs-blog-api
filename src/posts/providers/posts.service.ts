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
  posts: IPost[] = [];

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
