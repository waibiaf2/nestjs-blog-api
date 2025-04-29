import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  public findAll(limit: number, page: number) {
    console.log(limit, page);
    
    const users = [
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
    
    return users;
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
