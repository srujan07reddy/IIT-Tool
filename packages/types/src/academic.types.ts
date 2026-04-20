import { BaseEntity } from './common.types';

export interface Course extends BaseEntity {
  name: string;
  description?: string;
  durationMonths: number;
}

export interface Subject extends BaseEntity {
  courseId: string;
  name: string;
  code: string;
}

export interface Chapter extends BaseEntity {
  subjectId: string;
  name: string;
  sequenceNumber: number;
}

export interface Topic extends BaseEntity {
  chapterId: string;
  name: string;
  sequenceNumber: number;
  difficultyLevel: 'EASY' | 'MEDIUM' | 'HARD';
  estimatedHours: number;
}

export interface TopicStatus extends BaseEntity {
  batchId: string;
  topicId: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  facultyId: string;
  completedAt?: string | Date;
  remarks?: string;
}