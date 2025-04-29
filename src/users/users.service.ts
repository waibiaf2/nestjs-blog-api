import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  public getAllUsers(limit: number, page: number) {
    return `This is page  ${page} from the list of users, and the limit is ${limit}`;
  }
}
