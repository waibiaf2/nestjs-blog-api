import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../../auth/providers/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';

/**
 * Class to connect to users table and conduction user-based operations
 * */
@Injectable()
export class UsersService {
  /**
   * Constructor to inject Dependencies
   * @param userRepository
   * @param authService - AuthService instance
   */
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    //Handle exceptions
    if (existingUser) throw new Error('UserEntity already exists');

    //Create a new user
    let newUser = this.userRepository.create(createUserDto);
    newUser = await this.userRepository.save(newUser);

    return newUser;
  }

  /**
   * Method to find all users
   * @param limit - number of users to return
   * @param page - page number
   * @returns array of users
   */
  public findAll(limit: number, page: number) {
    console.log(limit, page);
    this.authService.login('johndoe@email.com', 'password', 1);
    return this.userRepository.find();
  }

  /**
   * Method to find user by id
   * @param id - user id
   * @returns user object
   */
  public async findOneById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }
}
