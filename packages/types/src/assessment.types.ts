import { BaseEntity } from './common.types';

export interface QuestionBankItem extends BaseEntity {
  subject: string;
  chapter: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  prompt: string;
  tags: string[];
}

export interface OmrParseResult extends BaseEntity {
  studentName: string;
  rollNumber: string;
  status: 'SUCCESS' | 'FAILED';
  reason?: string;
}

export interface KpiMetric {
  id: string;
  label: string;
  value: string;
  delta?: string;
}

export interface CohortHeatmapDatum {
  cohort: string;
  subject: string;
  readinessScore: number;
}
