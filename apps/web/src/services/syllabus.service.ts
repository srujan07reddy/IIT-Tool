import { api } from '@/lib/api';
import type { SubjectEntity, ChapterEntity, TopicEntity, TopicStatus } from '@coaching-ops/types';

export interface SyllabusTree {
  subjects: Subject[];
}

export async function getFullSyllabusTree(): Promise<SyllabusTree> {
  const { data } = await api.get('/academics/syllabus');
  return data;
}

export async function updateTopicStatus(topicId: string, status: TopicStatus): Promise<TopicEntity> {
  const { data } = await api.patch(`/academics/topics/${topicId}/status`, { status });
  return data;
}

export async function getSubjectProgress(subjectId: string): Promise<number> {
  const { data } = await api.get(`/academics/subjects/${subjectId}/progress`);
  return data.progress;
}
