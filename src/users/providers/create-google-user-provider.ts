import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GoogleUserInterface } from '../interfaces/google-user-interface';

@Injectable()
export class CreateGoogleUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async createGoogleUser(googleUser: GoogleUserInterface) {
    try {
      const user = this.userRepository.create(googleUser);

      // Save the user to the database
      return await this.userRepository.save(user);
    } catch (err) {
      throw new BadRequestException(err, {
        description: 'Error creating a new user',
      });
    }
  }
}
