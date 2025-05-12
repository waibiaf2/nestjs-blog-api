import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class BcryptProvider implements HashingProvider {
  public async hashPassword(data: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(data, salt);
  }

  public async comparePassword(
    data: string | Buffer,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(data, hash);
  }
}
