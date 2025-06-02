import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/providers/users.service';
import { User } from '../../users/user.entity';
import JwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { ActiveUserData } from '../ interfaces/active-user-data.interface';

@Injectable()
export class RefreshTokensProvider {
  constructor(
    private readonly jwtService: JwtService,
    private readonly generateTokensProvider: GenerateTokensProvider,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    @Inject(JwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof JwtConfig>,
  ) {}

  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      // Verify the refresh token using the JwtService
      const { sub } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'>
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });

      //console.log('This is the sub we have extracted', sub);
      if (!sub)
        throw new BadRequestException({
          description: 'Invalid refresh token',
        });

      // Fetch the user from the database
      const user = await this.userService.findOneById(sub);

      //Generate the tokens
      return await this.generateTokensProvider.generateTokens(user as User);
    } catch (err) {
      throw new UnauthorizedException(err, {
        description: 'Unauthorized you are not authorized to login',
      });
    }
  }
}
