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
import { PaginationProvider } from '../../common/pagination/providers/pagination.provider';
import { Paginated } from '../../common/pagination/interfaces/paginated.inteface';
import { CreatePostProvider } from './create-post.provider';
import { ActiveUserData } from '../../auth/ interfaces/active-user-data.interface';

/**
 * PostsService class
 * @Description This class handles the business logic for posts
 * @Method create
 * @Method findAll
 * @Method findOneById
 **/
@Injectable()
export class PostsService {
  /**
   * Constructor for the PostsService
   * @param userService
   * @param tagsService
   * @param postRepository
   * @param paginationProvider
   * @param createPostProvider
   **/
  constructor(
    private readonly tagsService: TagsService,
    private readonly userService: UsersService,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    /**
     * Injecting pagionation provider*/
    private readonly paginationProvider: PaginationProvider<Post>,
    private readonly createPostProvider: CreatePostProvider,
  ) {}

  /**
   * Create a new post
   * @Param createPostDto - The data to create a new post
   * @param user
   * */
  async create(createPostDto: CreatePostDto, user: ActiveUserData) {
    return this.createPostProvider.createPost(createPostDto, user);
  }

  /**
   * Fetch all posts, including the author, metaOptions, and tags
   * Also Fetches all posts for A specific user
   * */
  public async findAll(postQuery: GetPostsDto): Promise<Paginated<Post>> {
    let posts: Paginated<Post> | null;
    /**
     * Fetching all posts
     * */
    try {
      posts = await this.paginationProvider.paginateQuery(
        {
          limit: postQuery.limit,
          page: postQuery.page,
        },
        this.postRepository,
      );
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
