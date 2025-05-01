import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../../auth/providers/auth.service';

/**
 * Interface to define user object
 * @property firstName - user's first name
 * @property lastName - user's last name
 * @property email - user's email
 */
export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
}

/**
 * Class to connect to users table and conduction user-based operations
 * */
@Injectable()
export class UsersService {
  /**
   * Array to hold user objects
   */
  private users: IUser[];

  /**
   * Constructor to inject Dependencies
   * @param authService - AuthService instance
   */
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  /**
   * Method to find all users
   * @param limit - number of users to return
   * @param page - page number
   * @returns array of users
   */
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

  /**
   * Method to find user by id
   * @param id - user id
   * @returns user object
   */
  public findOneById(id: number = 1) {
    return {
      id,
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@email.com',
    };
  }
}
