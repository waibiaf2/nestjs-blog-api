import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UsersCreateManyProvider {
  constructor(private readonly dataSource: DataSource) {}

  public async createMany(createUsersDto: CreateUserDto[]) {
    const newUsers: User[] = [];

    // Create query runner instance
    const queryRunner = this.dataSource.createQueryRunner();

    // Connect Query Runner to datasource
    await queryRunner.connect();

    // Start transaction
    await queryRunner.startTransaction();

    try {
      for (const user of createUsersDto) {
        const newUser = queryRunner.manager.create(User, user);
        const result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      // If successful Commit
      await queryRunner.commitTransaction();
    } catch (err) {
      //if unsuccessful rollback
      await queryRunner.rollbackTransaction();
    } finally {
      // Release the query runner which is manually created
      await queryRunner.release();
    }

    return newUsers;
  }
}
