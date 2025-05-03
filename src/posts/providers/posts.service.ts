import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../../users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { PatchPostDto } from '../dtos/patch-posts.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from '../../meta-options/meta-option.entity';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';

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
    // Check if a user exists in the database
    const author = await this.userService.findOneById(createPostDto.authorId);

    if (!author) {
      throw new NotFoundException(
        `User with id ${createPostDto.authorId} not found`,
      );
    }

    //Create Post
    // @ts-expect-error
    const post = this.postRepository.create({
      ...createPostDto,
      author: author,
    });

    await this.postRepository.save(post);

    //Return post
    return post;
  }

  findAll() {
    return this.postRepository.find({
      relations: {
        metaOptions: true,
        author: true,
      },
    });
  }

  async findAllByUserId(userId: number) {
    // Check if a user exists in the database
    const user = await this.userService.findOneById(userId);

    if (!user) throw new NotFoundException(`User with id ${userId} not found`);

    //Fetch posts and filter out those where the user id is equal to the author id
    const posts = await this.postRepository.find({
      where: {
        author: user,
      },
    });

    if (!posts.length) {
      throw new NotFoundException(`User with id ${userId} has no posts`);
    }

    return posts;
  }

  async findOneById(id: number) {
    const post = await this.postRepository.findOneBy({ id });

    if (!post) throw new NotFoundException(`Post with id ${id} not found`);

    return post;
  }

  async updatePost(id: number, patchPostDto: Partial<PatchPostDto>) {
    const post = await this.postRepository.findOneBy({ id });

    if (!post) throw new NotFoundException(`Post with id ${id} not found`);

    Object.assign(post, patchPostDto);
    return await this.postRepository.save(post);
  }

  public async deletePost(id: number) {
    const postExists = await this.postRepository.existsBy({ id });

    if (!postExists)
      throw new NotFoundException(`Post with id ${id} not found`);

    await this.postRepository.delete(id);
    return { deleted: true, id };
  }
}
