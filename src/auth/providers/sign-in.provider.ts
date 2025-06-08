import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { UsersService } from '../../users/providers/users.service';
import { HashingProvider } from './hashing.provider';
import { GenerateTokensProvider } from './generate-tokens.provider';

@Injectable()
export class SignInProvider {
  constructor(
    /**
     * Inject User Service: It's a circular dependency hence using forwardRef*/
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly hashingProvider: HashingProvider,
    private readonly generateTokenProvider: GenerateTokensProvider,
  ) {}

  public async signIn(signInDto: SignInDto) {
    // Find the user using email ID
    // Throw exception if the user is not found
    const user = await this.userService.findOneByEmail(signInDto.email);

    // Compare password to the hash
    const isPasswordValid = await this.hashingProvider.comparePassword(
      signInDto.password,
      user.password ?? '',
    );

    if (!isPasswordValid) throw new UnauthorizedException('Invalid password');

    return await this.generateTokenProvider.generateTokens(user);
  }
}
