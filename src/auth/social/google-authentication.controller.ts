import { Body, Controller, Post } from '@nestjs/common';
import { GoogleAuthenticationService } from './providers/google-authentication.service';
import { GoogleTokenDto } from './dtos/google-token.dto';
import { Auth } from '../decorator/auth.decorator';
import { AuthType } from '../enums/auth-type.enums';

@Controller('auth/google-auth')
export class GoogleAuthenticationController {
  constructor(
    private readonly googleAuthenticationService: GoogleAuthenticationService,
  ) {}

  @Post()
  @Auth(AuthType.None)
  public async authenticateWithGoogle(@Body() googleTokenDto: GoogleTokenDto) {
    // This method will handle the Google authentication logic
    return await this.googleAuthenticationService.authenticate(googleTokenDto);
  }
}
