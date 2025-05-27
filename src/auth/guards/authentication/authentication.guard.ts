import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { AuthType } from '../../enums/auth-type.enums';
import { Reflector } from '@nestjs/core';
import { AUTH_TYPE_KEY } from '../../constants/auth.constants';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  // Default authentication type if none is specified
  private static readonly defaultAuthType = AuthType.Bearer;

  // Map of authentication types to their corresponding guards
  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  >;

  constructor(
    private readonly reflector: Reflector, // Used to retrieve metadata
    private readonly accessTokenGuard: AccessTokenGuard, // Guard for Bearer token authentication
  ) {
    // Initialize the map of authentication types to guards
    this.authTypeGuardMap = {
      [AuthType.Bearer]: this.accessTokenGuard, // Use AccessTokenGuard for Bearer auth
      [AuthType.None]: {
        canActivate: () => true, // No authentication required for None
      },
    };
  }

  // Main method to determine if the request can proceed
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Retrieve the authentication types from metadata
    const authTypes = this.getAuthTypes(context);

    // Map the authentication types to their corresponding guards
    const guards = authTypes.map((type) => this.authTypeGuardMap[type]).flat();

    // Default error to throw if no guard allows access
    const error = new UnauthorizedException();

    // Iterate through the guards and check if any allows access
    for (const instance of guards) {
      const canActivate = await Promise.resolve(
        instance.canActivate(context),
      ).catch((err) => {
        throw new BadRequestException(err, {
          description: 'Unauthorized access',
        });
      });
      if (canActivate) return true; // Grant access if a guard allows it
    }

    // Throw an error if no guard allows access
    throw error;
  }

  // Helper method to retrieve authentication types from metadata
  private getAuthTypes(context: ExecutionContext): AuthType[] {
    return (
      this.reflector.getAllAndOverride<AuthType[]>(AUTH_TYPE_KEY, [
        context.getHandler(), // Checks metadata on the method
        context.getClass(), // Checks metadata on the class
      ]) ?? [AuthenticationGuard.defaultAuthType] // Use default if none is specified
    );
  }
}
