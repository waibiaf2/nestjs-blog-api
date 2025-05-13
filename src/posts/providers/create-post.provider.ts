import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { TagsService } from '../../tags/providers/tags.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../../users/providers/users.service';
import { ActiveUserData } from '../../auth/ interfaces/active-user-data.interface';
import { Tag } from 'src/tags/tag.entity';

@Injectable()
export class CreatePostProvider {
  constructor(
    private readonly tagsService: TagsService,
    private readonly userService: UsersService,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  /**
   * Create a new post
   * @Param createPostDto - The data to create a new post
   * @param user
   * */
  async createPost(createPostDto: CreatePostDto, user: ActiveUserData) {
    let author;
    let tags: Tag[];

    try {
      // Fetch User creating post
      if (!user.sub) throw new BadRequestException('User ID is required');
      author = await this.userService.findOneById(user.sub);

      //Fetch tags
      tags = await this.tagsService.findMultipleTags(createPostDto.tags ?? []);
    } catch (error) {
      throw new BadRequestException(error, {
        description: 'User or Tags could not be fetched...',
      });
    }

    console.log(tags);

    if ((createPostDto.tags ?? []).length != tags.length) {
      throw new BadRequestException('Please check your tag ids');
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
      throw new ConflictException(err, {
        description: 'Ensure post slug is unique and not a duplicate.',
      });
    }

    const { password, ...returnedUser } = post.author;
    console.log(password);
    console.log(returnedUser);

    //Return post
    return { ...post, author: returnedUser };
  }
}
