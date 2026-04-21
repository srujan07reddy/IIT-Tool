import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Inject, forwardRef } from '@nestjs/common';
import { UserEntity } from '../modules/auth/entities/user.entity';
import { UsersService } from '../../modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  async validateUser(email: string, password: string): Promise<UserEntity | null> {
    const user = await this.usersService.findByEmailForAuth(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result as UserEntity;
    }
    return null;
  }

async login(user: UserEntity): Promise<{ access_token: string; user: { id: string; email: string; role: string; firstName: string; lastName: string } }> {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }

async register(email: string, password: string, role: string, createdBy?: string): Promise<UserEntity> {
    const dto: any = { email, firstName: '', lastName: '', role, password }; // Minimal for register
    return this.usersService.createUserByAdmin(createdBy || 'system', dto);
  }
}
