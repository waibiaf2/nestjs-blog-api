import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { HashingProvider } from '../../auth/providers/hashing.provider';

@Injectable()
export class UsersCreateManyProvider {
  constructor(
    private readonly dataSource: DataSource,
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    const newUsers: User[] = [];

    // Create query runner instance
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      // Connect Query Runner to datasource
      await queryRunner.connect();

      // Start transaction
      await queryRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException({
        message: 'Database connection failed',
        error: error as Error,
      });
    }

    try {
      for (const user of createManyUsersDto.users) {
        const newUser = queryRunner.manager.create(User, {
          ...user,
          password: await this.hashingProvider.hashPassword(user.password),
        });
        const result = await queryRunner.manager.save(newUser);
        const { password, ...userData } = result;
        newUsers.push(userData as User);
      }
      // If successful Commit
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new ConflictException(
        'Unable to complete transaction, please try again later',
        String(error),
      );
    } finally {
      // Release the query runner which is manually created
      await queryRunner.release();
    }

    return newUsers;
  }
}
