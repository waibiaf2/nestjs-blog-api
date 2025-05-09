import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../../users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { PatchPostDto } from '../dtos/patch-posts.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { TagsService } from '../../tags/providers/tags.service';
import { GetPostsDto } from '../dtos/get-posts.dto';

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
    let post = this.postRepository.create({
      ...createPostDto,
      tags: tags,
      author: author,
    } as Partial<Post>);

    try {
      post = await this.postRepository.save(post);
    } catch (err) {
      throw new BadRequestException(
        'Error creating post, please try again',
        String(err),
      );
    }

    //Return post
    return post;
  }

  /**
   * Method signatures for overloading the findAll
   */
  findAll(postQuery: GetPostsDto): Promise<Post[]>;
  findAll(postQuery: GetPostsDto, userId: number): Promise<Post[]>;

  /**
   * Fetch all posts, including the author, metaOptions, and tags
   * Also Fetches all posts for A specific user
   * */
  public async findAll(postQuery: GetPostsDto, userId?: number) {
    let posts: Post[] = [];

    /**
     * Fetch posts for a particular user
     * */
    if (userId) {
      // Check if a user exists in the database
      const user = await this.userService.findOneById(userId);

      if (!user)
        throw new NotFoundException(`User with id ${userId} not found`);

      try {
        posts = await this.postRepository.find({
          where: {
            author: user,
          },
          relations: {
            metaOptions: true,
            tags: true,
            author: true,
          },
          skip: ((postQuery.page ?? 1) - 1) * (postQuery.limit ?? 0),
          take: postQuery.limit,
        });
      } catch (error) {
        throw new BadRequestException(
          'Error fetching posts, please try again',
          String(error),
        );
      }

      return posts;
    }

    /**
     * Fetching all posts
     * */
    try {
      posts = await this.postRepository.find({
        relations: {
          metaOptions: true,
          tags: true,
          author: true,
        },
        skip: ((postQuery.page ?? 1) - 1) * (postQuery.limit ?? 0),
        take: postQuery.limit,
      });
    } catch (err) {
      throw new BadRequestException(
        'Error fetching posts, please try again',
        String(err),
      );
    }

    return posts;
  }

  /**
   * Fetch all posts by user id
   * @param userId - The id of the user
   * */

  //async findAll(userId: number) {}

  /**
   * Fetch a post by id
   * @param id - The id of the post
   * */
  async findOneById(id: number) {
    let post: Post | null;

    try {
      post = await this.postRepository.findOneBy({ id });
    } catch (error) {
      throw new BadRequestException(
        'Error fetching post, please try again',
        String(error),
      );
    }

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

    let post: Post | null;

    try {
      // Find the post
      post = await this.postRepository.findOneBy({ id: patchPostDto.id });

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
    } catch (err) {
      throw new BadRequestException(
        'Error fetching post, please try again',
        String(err),
      );
    }

    //update the properties
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
