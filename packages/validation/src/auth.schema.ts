import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const LoginSchema = loginSchema;

export const userRoleSchema = z.enum([
  'SUPER_ADMIN', 'ADMIN', 'MANAGEMENT', 'FACULTY', 'OPERATIONS', 'STAFF', 'TECHNICIAN', 'ACCOUNT', 'STUDENT'
]);

export const createUserSchema = z.object({
  email: z.string().email("Invalid email"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  role: userRoleSchema,
  isActive: z.boolean().default(true),
});

export const adminCreateUserSchema = createUserSchema.extend({
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const adminResetPasswordSchema = z.object({
  userId: z.string().uuid('Valid user id is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const updateOwnPasswordSchema = z.object({
  currentPassword: z.string().min(8, 'Current password must be at least 8 characters long'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters long'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type AdminCreateUserInput = z.infer<typeof adminCreateUserSchema>;
export type AdminResetPasswordInput = z.infer<typeof adminResetPasswordSchema>;
export type UpdateOwnPasswordInput = z.infer<typeof updateOwnPasswordSchema>;
