import { BaseEntity } from './common.types';

export interface ParentInfo {
  fatherName: string;
  motherName: string;
  primaryContact: string;
  secondaryContact?: string;
  email?: string;
}

export interface Document extends BaseEntity {
  studentId: string;
  documentType: 'ID_PROOF' | 'PREVIOUS_MARKSHEET' | 'PHOTO' | 'ADDRESS_PROOF';
  fileUrl: string;
  isVerified: boolean;
  verifiedBy?: string;
}

export interface AcademicProfile {
  previousSchool: string;
  board: string;
  lastScorePercentage: number;
  targetExam: string; // e.g., 'JEE', 'NEET'
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum StudentStatus {
  PROSPECT = 'PROSPECT',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ALUMNI = 'ALUMNI',
  DROPPED = 'DROPPED',
}

export interface StudentMaster extends BaseEntity {
  rollNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string | Date;
  gender: Gender;
  phone?: string; 
  email: string;
  currentBatchId: string;
  enrollmentDate?: Date;
  status: StudentStatus;
  parentDetails: ParentInfo;
  metadata?: Record<string, any>;
}

export type CreateStudentDto = Omit<
  StudentMaster,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
> & {
  status?: StudentStatus;
};

export type UpdateStudentDto = Partial<CreateStudentDto>;