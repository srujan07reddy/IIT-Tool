import { Injectable, UnauthorizedException, Inject, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entities/user.entity';
import authConfig from '../../config/auth.config';
import { JWTPayload, LoginDto } from '@coaching-ops/types';

/**
 * AuthService
 * Handles the business logic for authentication:
 * 1. Validating credentials
 * 2. Hashing passwords
 * 3. Issuing JWTs
 */
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(authConfig.KEY)
    private config: ConfigType<typeof authConfig>,
  ) {}

  /**
   * validateUser
   * Checks if the email exists and the password matches.
   */
  async validateUser(loginDto: LoginDto, user: UserEntity): Promise<any> {
    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Strip password before returning
    const { password, ...result } = user;
    return result;
  }

  /**
   * login
   * Generates the JWT for a successfully authenticated user.
   */
  async login(user: UserEntity) {
    const payload: JWTPayload = { 
      sub: user.id, 
      email: user.email, 
      role: user.role 
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  /**
   * hashPassword
   * Utility for when we create or update users.
   */
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.config.saltRounds);
  }
}
