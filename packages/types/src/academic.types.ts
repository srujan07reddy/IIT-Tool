import { BaseEntity } from './common.types';

export interface Course extends BaseEntity {
  name: string;
  description?: string;
  durationMonths: number;
}

export interface Batch extends BaseEntity {
  name: string;
  code: string;
  courseName: string;
  startsOn?: string | Date;
  endsOn?: string | Date;
  isActive: boolean;
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

export enum TopicStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export interface TopicProgress extends BaseEntity {
  topicId: string;
  batchId: string;
  facultyId: string;
  status: TopicStatus;
  remarks?: string;
  updatedBy?: string;
}

export interface ChapterWithTopics extends Chapter {
  topics: Array<Topic & { progress?: TopicProgress }>;
}

export interface SubjectHierarchy extends Subject {
  chapters: ChapterWithTopics[];
}

export interface ContextCardContent {
  whyLearn: string;
  realWorldApplication: string;
}

export interface ContextCard extends BaseEntity {
  topicId: string;
  createdBy: string;
  content: ContextCardContent;
  isVerified: boolean;
}
