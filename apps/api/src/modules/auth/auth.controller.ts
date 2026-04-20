import { Controller, Post, Body, UseGuards, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LoginDto, LoginResponse } from '@coaching-ops/types';
import { Public } from '../../common/decorators/public.decorator';

/**
 * AuthController
 * Handles incoming HTTP requests for authentication.
 */
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  /**
   * POST /auth/login
   * Public endpoint to authenticate a user.
   * Uses HttpCode 200 because a login is technically a "query" for a token.
   */
  @Public() // Custom decorator to bypass the global JWT guard
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    // 1. Find the user by email
    const user = await this.usersService.findByEmail(loginDto.email);
    
    // 2. Validate credentials via AuthService
    await this.authService.validateUser(loginDto, user);
    
    // 3. Issue and return the JWT
    return this.authService.login(user);
  }

  /**
   * POST /auth/logout
   * Placeholder for logout logic (usually handled by client-side token disposal,
   * but can be used for token blacklisting).
   */
  @Post('logout')
  async logout(@Req() req: any) {
    // Logic for blacklisting tokens would go here
    return { message: 'Logged out successfully' };
  }
}