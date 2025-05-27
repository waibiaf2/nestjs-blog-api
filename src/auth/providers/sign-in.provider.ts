import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { UsersService } from '../../users/providers/users.service';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import JwtConfig from '../config/jwt.config';
import { ActiveUserData } from '../ interfaces/active-user-data.interface';

@Injectable()
export class SignInProvider {
  constructor(
    /**
     * Inject User Service: It's a circular dependency hence using forwardRef*/
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    /**
     * Inject hashingProvider
     * */
    private readonly hashingProvider: HashingProvider,
    /**
     * Injecting JwtService*/
    private readonly jwtService: JwtService,
    /**
     * Inject JwtConfiguration
     * */
    @Inject(JwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof JwtConfig>,
  ) {}

  public async signIn(signInDto: SignInDto) {
    // Find the user using email ID
    // Throw exception if the user is not found
    const user = await this.userService.findOneByEmail(signInDto.email);

    // Compare password to the hash
    const isPasswordValid = await this.hashingProvider.comparePassword(
      signInDto.password,
      user.password,
    );
    
    if (!isPasswordValid) throw new UnauthorizedException('Invalid password');

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      } as ActiveUserData,
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );

    return {
      accessToken: accessToken,
    };
  }
}
