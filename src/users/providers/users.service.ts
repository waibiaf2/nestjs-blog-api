import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../../auth/providers/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { CreateUserProvider } from './create-user.provider';
import { FindUserByEmailProvider } from './find-user-by-email-provider.service';

/**
 * Class to connect to users table and conduction user-based operations
 * */
@Injectable()
export class UsersService {
  /**
   * Constructor to inject Dependencies
   * @param userRepository
   * @param authService - AuthService instance
   * @param usersCreateManyProvider
   * @param createUserProvider
   * @param usersFindOneUserByEmailProvider
   */
  constructor(
    // If unsuccessful rollback

    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly usersCreateManyProvider: UsersCreateManyProvider,
    private readonly createUserProvider: CreateUserProvider,
    private readonly usersFindOneUserByEmailProvider: FindUserByEmailProvider,
  ) {}

  /**
   * */
  public async createUser(createUserDto: CreateUserDto) {
    const createdUser = await this.createUserProvider.create(createUserDto);
    const { password, ...user } = createdUser;
    return user;
  }

  /**
   * Method to find all users
   * @param limit - number of users to return
   * @param page - page number
   * @returns array of users
   */
  public async findAll(limit: number, page: number) {
    const users = await this.userRepository.find();
    return users.map((user) => {
      const { password, ...userData } = user;
      return userData;
    });
  }

  /**
   * Method to find user by id
   * @returns user object
   * @param email
   */
  public async findOneByEmail(email: string) {
    return await this.usersFindOneUserByEmailProvider.findOneByEmail(email);
  }

  public async createMany(createUsersDto: CreateManyUsersDto) {
    return await this.usersCreateManyProvider.createMany(createUsersDto);
  }

  async findOneById(id: number) {
    return this.userRepository.findOneBy({
      id: id,
    });
  }
}
