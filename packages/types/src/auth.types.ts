import { BaseEntity } from './common.types';

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  MANAGEMENT = 'MANAGEMENT',
  FACULTY = 'FACULTY',
  OPERATIONS = 'OPERATIONS',
  STUDENT = 'STUDENT',
}

export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  lastLoginAt?: string | Date;
}

export type Permission = string;

export interface JWTPayload {
  sub: string;
  email: string;
  role: UserRole;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
  };
}