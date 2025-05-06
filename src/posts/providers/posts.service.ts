import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../../users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { PatchPostDto } from '../dtos/patch-posts.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { TagsService } from '../../tags/providers/tags.service';

/**
 * PostsService class
 * @Description This class handles the business logic for posts
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
   * @param tagsService
   * @param postRepository
   **/
  constructor(
    private readonly tagsService: TagsService,
    private readonly userService: UsersService,
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

    const tags = await this.tagsService.findMultipleTags(
      createPostDto.tags ?? [],
    );

    console.log(tags);

    if (!author) {
      throw new NotFoundException(
        `User with id ${createPostDto.authorId} not found`,
      );
    }

    //Create Post
    const post = this.postRepository.create({
      ...createPostDto,
      tags: tags,
      author: author,
    } as Partial<Post>);

    await this.postRepository.save(post);

    //Return post
    return post;
  }

  /**
   * Fetch all posts, including the author, metaOptions, and tags
   * */
  findAll() {
    return this.postRepository.find({
      relations: {
        metaOptions: true,
        tags: true,
        author: true,
      },
    });
  }

  /**
   * Fetch all posts by user id
   * @param userId - The id of the user
   * */
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

  /**
   * Fetch a post by id
   * @param id - The id of the post
   * */
  async findOneById(id: number) {
    const post = await this.postRepository.findOneBy({ id });

    if (!post) throw new NotFoundException(`Post with id ${id} not found`);

    return post;
  }

  /**
   * Fetch a post by slug
   * @param patchPostDto
   * */
  async update(patchPostDto: PatchPostDto) {
    // Find the tags
    const tags = await this.tagsService.findMultipleTags(
      patchPostDto.tags ?? [],
    );

    // Find the post
    const post = await this.postRepository.findOneBy({ id: patchPostDto.id });

    //update the properties
    if (post instanceof Post) {
      post.title = patchPostDto.title ?? post?.title;
      post.content = patchPostDto.content ?? post?.content;
      post.metaOptions = patchPostDto.metaOptions ?? post?.metaOptions;
      post.publishedOn = patchPostDto.publishedOn ?? post?.publishedOn;
      post.featuredImageUrl =
        patchPostDto.featuredImageUrl ?? post?.featuredImageUrl;
      post.schema = patchPostDto.schema ?? post?.schema;
      post.postType = patchPostDto.postType ?? post?.postType;
      post.status = patchPostDto.status ?? post?.status;
      post.slug = patchPostDto?.slug ?? post?.slug;

      // assign the new tags
      post.tags = tags;
    }

    return await this.postRepository.save(post as Post);
  }

  public async deletePost(id: number) {
    const postExists = await this.postRepository.existsBy({ id });

    if (!postExists)
      throw new NotFoundException(`Post with id ${id} not found`);

    await this.postRepository.delete(id);
    return { deleted: true, id };
  }
}
