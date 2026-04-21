import { z } from 'zod';
import { uuidSchema } from './common.schema';

export const updateTopicStatusSchema = z.object({
  topicId: uuidSchema,
  batchId: uuidSchema,
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']),
  facultyId: uuidSchema,
  remarks: z.string().max(500, "Remarks cannot exceed 500 characters").optional(),
});

export const createSubjectSchema = z.object({
  courseId: uuidSchema,
  batchId: uuidSchema.optional(),
  name: z.string().min(2, "Subject name is required"),
  code: z.string().min(2, "Subject code is required"),
});

export const contextCardSchema = z.object({
  topicId: uuidSchema,
  createdBy: uuidSchema.optional(),
  content: z.object({
    whyLearn: z.string().min(8, 'Why Learn is required'),
    realWorldApplication: z.string().min(8, 'Real-world application is required'),
  }),
  isVerified: z.boolean().default(false),
});

export type UpdateTopicStatusInput = z.infer<typeof updateTopicStatusSchema>;
export type ContextCardInput = z.infer<typeof contextCardSchema>;
