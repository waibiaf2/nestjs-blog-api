import {
  Injectable,
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
        description: 'Could not fetch user...',
      });
    }

    if (!user) {
      throw new UnauthorizedException(
        'Access denied! User is not authenticated.',
      );
    }

    return user;
  }
}
