import { Injectable } from '@nestjs/common';
import { UserEntity } from '../auth/entities/user.entity';

@Injectable()
export class UsersService {
  // TODO: Implement users service
  async findByEmail(email: string): Promise<UserEntity | null> {
    // TODO: implement
    return null;
  }
}