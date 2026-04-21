import { BaseEntity } from './common.types';

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  MANAGEMENT = 'MANAGEMENT',
  FACULTY = 'FACULTY',
  OPERATIONS = 'OPERATIONS',
  STAFF = 'STAFF',
  TECHNICIAN = 'TECHNICIAN',
  ACCOUNT = 'ACCOUNT',
  STUDENT = 'STUDENT',
}

export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  createdBy?: string;
  lastLoginAt?: string | Date;
  passwordLastChangedAt?: string | Date;
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

export interface AdminCreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  password: string;
  isActive?: boolean;
}

export interface AdminResetPasswordDto {
  userId: string;
  newPassword: string;
}

export interface UpdateOwnPasswordDto {
  currentPassword: string;
  newPassword: string;
}
