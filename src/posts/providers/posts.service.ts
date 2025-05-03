import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../../users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { PostType } from '../enums/post-type.enum';
import { PostStatus } from '../enums/post-status.enum';
import { CreateMetaOptionsDto } from '../../meta-options/dtos/create-meta-options.dto';
import { PatchPostDto } from '../dtos/patch-posts.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from '../../meta-options/meta-option.entity';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';

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
  metaOptions: CreateMetaOptionsDto[];
}

/**
 * PostsService class
 * @Method create
 * @Method findAll
 * @Method findAllByUserId
 * @Method findOneById
 **/
@Injectable()
export class PostsService {
  /**
   * Constructor for the PostsService
   * @param userService
   * @param metaOptionRepository
   * @param postRepository
   **/
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  /**
   * Create a new post
   * @Param createPostDto - The data to create a new post
   * */
  async create(createPostDto: CreatePostDto) {
    //Create Post
    const post = this.postRepository.create(createPostDto as Post);
    await this.postRepository.save(post);

    //Return post
    return post;
  }

  findAll() {
    return this.postRepository.find({
      relations: {
        metaOptions: true,
        tags: true,
      },
    });
  }

  findAllByUserId(userId: string) {
    console.log(userId);
    //return this.posts[0];
  }

  findOneById(id: number) {
    /*const post = this.posts.find((post) => post.id === id);
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return post;*/
    console.log(id);
  }

  updatePost(patchPostDto: PatchPostDto) {
    console.log(patchPostDto);
  }

  public async deletePost(id: number) {
    const postExists = await this.postRepository.existsBy({ id });

    if (!postExists)
      throw new NotFoundException(`Post with id ${id} not found`);

    await this.postRepository.delete(id);
    return { deleted: true, id };
  }
}
