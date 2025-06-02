import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FindUserByEmailProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findOneByEmail(email: string): Promise<User> {
    let user: User | null = null;

    try {
      user = await this.userRepository.findOneBy({ email: email });
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description:
          'Could not fetch user..., probably a user the provided credentials does not exist',
      });
    }

    return user as User;
  }
}
