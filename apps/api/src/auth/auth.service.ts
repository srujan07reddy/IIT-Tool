import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

export interface User {
  id: number;
  email: string;
  role: string;
  password: string;
}

@Injectable()
export class AuthService {
  // Mock users for demo - replace with database
  private users: User[] = [
    {
      id: 1,
      email: 'student@example.com',
      role: 'student',
      password: 'password',
    },
    {
      id: 2,
      email: 'staff@example.com',
      role: 'staff',
      password: 'password',
    },
    {
      id: 3,
      email: 'admin@example.com',
      role: 'admin',
      password: 'password',
    },
    {
      id: 4,
      email: 'technician@example.com',
      role: 'technician',
      password: 'password',
    },
  ];

  constructor(private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = this.users.find(u => u.email === email);
    if (user && user.password === password) { // Plain text for demo
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  async register(email: string, password: string, role: string) {
    // Check if user exists
    if (this.users.find(u => u.email === email)) {
      throw new UnauthorizedException('User already exists');
    }

    // Create user (no hashing for demo)
    const newUser: User = {
      id: this.users.length + 1,
      email,
      role,
      password, // Plain text for demo
    };

    this.users.push(newUser);

    const { password: _, ...result } = newUser;
    return result;
  }
}
