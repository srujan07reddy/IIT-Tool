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

export interface StudentMaster extends BaseEntity {
  registrationNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string | Date;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  phoneNumber: string; 
  email: string;
  address: string;
  parentInfo: ParentInfo;
  academicProfile: AcademicProfile;
  batchId?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'ALUMNI' | 'DROPPED';
}