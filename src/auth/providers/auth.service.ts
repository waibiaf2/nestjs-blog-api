import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  public login(email: string, password: string, id: number) {
    //check if a user exists in the database
    const user = this.userService.findOneById(id);
    //verify the user
    if (this.isAuthenticated() && user.email == email) {
      //generate a token
      return 'Default Token';
    }
    //generates a token
  }

  private isAuthenticated(): boolean {
    return true;
  }
}
