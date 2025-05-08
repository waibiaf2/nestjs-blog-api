import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { AuthService } from '../../auth/providers/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

/**
 * Class to connect to users table and conduction user-based operations
 * */
@Injectable()
export class UsersService {
  /**
   * Constructor to inject Dependencies
   * @param userRepository
   * @param authService - AuthService instance
   * @param profileConfiguration
   * @param usersCreatemanyProvider
   */
  constructor(
    // If unsuccessful rollback

    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,
    private readonly usersCreateManyProvider: UsersCreateManyProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    let existingUser: User | null;

    try {
      existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      }); // If unsuccessful rollback
    } catch (err) {
      console.log(err);
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try again later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    //Handle exceptions
    if (existingUser)
      throw new BadRequestException(
        'User with a similar email already exists, please check your email',
      );

    //Create a new user
    let newUser = this.userRepository.create();

    try {
      newUser = await this.userRepository.save(newUser);
    } catch (err) {
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try again later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    return newUser;
  }

  /**
   * Method to find all users
   * @param limit - number of users to return
   * @param page - page number
   * @returns array of users
   */
  public async findAll(limit: number, page: number) {
    return await this.userRepository.find();
  }

  /**
   * Method to find user by id
   * @param id - user id
   * @returns user object
   */
  public async findOneById(id: number) {
    if (!id) throw new BadRequestException('id is required to find a user');

    let user: User | null;

    try {
      user = await this.userRepository.findOneBy({ id });
    } catch (err) {
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try again later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  public async createMany(createUsersDto: CreateManyUsersDto) {
    return await this.usersCreateManyProvider.createMany(createUsersDto);
  }
}
