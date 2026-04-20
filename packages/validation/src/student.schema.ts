import { z } from 'zod';

export const parentInfoSchema = z.object({
  fatherName: z.string().min(2, "Father's name is required"),
  motherName: z.string().min(2, "Mother's name is required"),
  primaryContact: z.string().regex(/^\d{10}$/, "Primary contact must be 10 digits"),
  secondaryContact: z.string().regex(/^\d{10}$/, "Secondary contact must be 10 digits").optional(),
  email: z.string().email("Invalid parent email").optional(),
});

export const academicProfileSchema = z.object({
  previousSchool: z.string().min(2, "Previous school is required"),
  board: z.string().min(2, "Board is required"),
  lastScorePercentage: z.number().min(0).max(100, "Score must be between 0 and 100"),
  targetExam: z.string().min(2, "Target exam is required"),
});

// This schema will be used by the Frontend Form AND the Backend API Controller
export const createStudentSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  phoneNumber: z.string().regex(/^\d{10}$/, "Student phone number must be 10 digits"),
  email: z.string().email("Invalid student email"),
  address: z.string().min(10, "Full address is required"),
  parentInfo: parentInfoSchema,
  academicProfile: academicProfileSchema,
});

// We can export the inferred type so our apps can use it directly for form data
export type CreateStudentInput = z.infer<typeof createStudentSchema>;