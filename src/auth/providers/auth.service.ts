import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../../users/providers/users.service';
import { SignInDto } from '../dtos/signin.dto';
import { HashingProvider } from './hashing.provider';
import { SignInProvider } from './sign-in.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly hashingProvider: HashingProvider,
    private readonly signInProvider: SignInProvider,
  ) {}

  public async signIn(signInDto: SignInDto): Promise<boolean> {
    return await this.signInProvider.signIn(signInDto);
  }
}
