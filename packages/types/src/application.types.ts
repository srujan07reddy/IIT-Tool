import { BaseEntity } from './common.types';
import { Document, StudentMaster } from './student.types';

export enum ApplicationStage {
  DRAFT = 'DRAFT',
  DOCUMENTS_PENDING = 'DOCUMENTS_PENDING',
  READY_FOR_SUBMISSION = 'READY_FOR_SUBMISSION',
  SUBMITTED = 'SUBMITTED',
  APPROVED = 'APPROVED',
}

export interface ApplicationTimelineEvent extends BaseEntity {
  stage: ApplicationStage;
  title: string;
  description: string;
  occurredAt: string | Date;
  actorName: string;
}

export interface ApplicationDocumentCheck extends BaseEntity {
  documentId: string;
  label: string;
  status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  reviewer?: string;
  notes?: string;
}

export interface PaymentSummary {
  totalFee: number;
  paidAmount: number;
  dueAmount: number;
  dueDate?: string | Date;
  status: 'CLEAR' | 'PENDING';
}

export interface ExamApplication extends BaseEntity {
  studentId: string;
  student: Pick<StudentMaster, 'id' | 'firstName' | 'lastName' | 'email' | 'status'>;
  examName: string;
  stage: ApplicationStage;
  submittedAt?: string | Date;
  documents: Document[];
  checklist: ApplicationDocumentCheck[];
  paymentSummary: PaymentSummary;
  timeline: ApplicationTimelineEvent[];
}
