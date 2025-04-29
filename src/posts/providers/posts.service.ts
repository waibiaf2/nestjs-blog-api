import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  private posts = [
    {
      id: 1,
      title: 'Post 1',
      content: 'Content of post 1',
    },
    {
      id: 2,
      title: 'Post 2',
      content: 'Content of post 2',
    },
  ];

  findAll() {
    return this.posts;
  }
  
  findAllByUserId(userId: string) {
    console.log(userId);
    return this.posts;
  }

  findOneById(id: number) {
    return this.posts.find((post) => post.id === id);
  }
}
