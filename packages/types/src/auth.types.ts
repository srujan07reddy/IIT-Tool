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

export interface JWTPayload {
  sub: string;
  email: string;
  role: UserRole;
}