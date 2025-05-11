import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { UsersService } from '../../users/providers/users.service';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class SignInProvider {
  constructor(
    /**
     * Inject User Service: Its a circular dependency hence using forwardRef*/
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async signIn(signInDto: SignInDto) {
    // Find the user using email ID
    // Throw exception if the user is not found
    const user = await this.userService.findOneByEmail(signInDto.email);

    // Compare password to the hash
    let passwordIsValid: boolean;
    try {
      passwordIsValid = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
    } catch (err) {
      throw new RequestTimeoutException(err, {
        description: 'Could not compare passwors',
      });
    }

    // Send Confirmation
    if (!passwordIsValid)
      throw new UnauthorizedException('Invalid user credentials');

    return true;
  }
}
