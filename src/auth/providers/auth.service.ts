import { Injectable } from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { SignInProvider } from './sign-in.provider';

@Injectable()
export class AuthService {
  constructor(private readonly signInProvider: SignInProvider) {}

  public async signIn(
    signInDto: SignInDto,
  ): Promise<{ ['accessToken']: string }> {
    return await this.signInProvider.signIn(signInDto);
  }
}
