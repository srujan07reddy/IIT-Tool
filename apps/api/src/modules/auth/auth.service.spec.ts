import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService (Unit Test)', () => {
  let service: AuthService;

  // We "Mock" the dependencies so we don't need a real DB or JWT server
  const mockJwtService = { sign: () => 'mock-token' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should THROW UnauthorizedException if passwords do not match', async () => {
    const user = { password: 'hashedPassword' };
    const loginDto = { password: 'wrongPassword' };

    // Force bcrypt to return false (mismatch)
    jest.spyOn(bcrypt, 'compare').mockImplementation(async () => false);

    await expect(service.validateUser(loginDto as any, user as any))
      .rejects.toThrow(UnauthorizedException);
  });
});