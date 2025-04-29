import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../../users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  public login(email: string, password: string, id: number) {
    //check if a user exists in the database
    const user = this.userService.findOneById(id);
    //verify the user
    console.log(user);
    return this.isAuthenticated();
    //generates a token
  }

  private isAuthenticated(): boolean {
    return true;
  }
}
