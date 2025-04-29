import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../../auth/providers/auth.service';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
}

@Injectable()
export class UsersService {
  private users: IUser[];
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  public findAll(limit: number, page: number) {
    console.log(limit, page);
    this.authService.login('johndoe@email.com', 'password', 1);

    this.users = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@email.com',
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe@email.com',
      },
      {
        firstName: 'Jim',
        lastName: 'Doe',
        email: 'jindoe@email.com',
      },
    ];

    return this.users;
  }

  public findOneById(id: number = 1) {
    return {
      id,
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@email.com',
    };
  }
}
