import { BaseEntity } from './common.types';

export interface ParentInfo {
  fatherName: string;
  motherName: string;
  primaryContact: string;
  secondaryContact?: string;
  email?: string;
}

export enum DocumentType {
  ID_PROOF = 'ID_PROOF',
  PREVIOUS_MARKSHEET = 'PREVIOUS_MARKSHEET',
  PHOTO = 'PHOTO',
  ADDRESS_PROOF = 'ADDRESS_PROOF',
  OTHER = 'OTHER',
}

export enum VerificationStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
}

export enum StudentCategory {
  GENERAL = 'GENERAL',
  OBC = 'OBC',
  SC = 'SC',
  ST = 'ST',
  EWS = 'EWS',
}

export interface Document extends BaseEntity {
  studentId: string;
  documentType: DocumentType;
  fileUrl: string;
  verificationStatus: VerificationStatus;
  verifiedBy?: string;
  remarks?: string;
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