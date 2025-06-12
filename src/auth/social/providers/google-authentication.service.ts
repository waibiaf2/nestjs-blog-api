import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService, ConfigType } from '@nestjs/config';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { UsersService } from '../../../users/providers/users.service';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';
import { GoogleUserInterface } from '../../../users/interfaces/google-user-interface';
import JwtConfig from '../../config/jwt.config';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient: OAuth2Client;

  constructor(
    /*@Inject(JwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof JwtConfig>,*/
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  onModuleInit() {
    /*const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;*/
    const clientId = this.configService.get('JwtConfig.googleClientId');
    const clientSecret = this.configService.get('JwtConfig.googleClientSecret');
    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }

  public async authenticate(googleTokenDto: GoogleTokenDto) {
    // verify the Google token sent by the user
    const logInTicket = await this.oauthClient.verifyIdToken({
      idToken: googleTokenDto.token,
    });
    console.log(logInTicket);

    const payload = logInTicket.getPayload();
    if (!payload) {
      throw new Error('Invalid Google token');
    }

    // Extract payload from the Google token
    const {
      email,
      sub: googleId,
      given_name: firstName,
      family_name: lastName,
    } = payload;

    // Find the user in the database using GoogleId
    const user = await this.userService.findOneByGoogleId(googleId);

    // If the Google id exists generate tokens
    if (user) return this.generateTokensProvider.generateTokens(user);

    // Otherwise, create a new user in the database and generate tokens
    const newUser = await this.userService.createGoogleUser({
      email,
      googleId,
      firstName,
      lastName,
    } as GoogleUserInterface);

    return this.generateTokensProvider.generateTokens(newUser);
  }
}
