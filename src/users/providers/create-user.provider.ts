import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HashingProvider } from '../../auth/providers/hashing.provider';

@Injectable()
export class CreateUserProvider {
  constructor(
    /**
     * Inject User Repository*/
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    /**
     * Inject HashingProvider
     * */
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async create(createUserDto: CreateUserDto) {
    let existingUser: User | null;

    try {
      existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      }); // If unsuccessful rollback
    } catch (err) {
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try again later',
        String(err),
      );
    }

    //Handle exceptions
    if (existingUser)
      throw new BadRequestException(
        'User with a similar email already exists, please check your email',
      );

    //Create a new user
    let newUser = this.userRepository.create({
      ...createUserDto,
      password: await this.hashingProvider.hashPassword(createUserDto.password),
    });

    try {
      newUser = await this.userRepository.save(newUser);
    } catch (err) {
      throw new RequestTimeoutException(
        'Unable to process the request at the moment, please try again later',
        String(err),
      );
    }

    return newUser;
  }
}
