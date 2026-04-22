import { api } from '@/lib/api';
import type { Subject, Chapter, Topic, TopicStatus } from '@coaching-ops/types';

export interface SyllabusTree {
  subjects: Subject[];
}

export async function getFullSyllabusTree(): Promise<SyllabusTree> {
  try {
    const { data } = await api.get('/academics/syllabus');
    return data;
  } catch (error) {
    console.warn('Failed to fetch syllabus tree, returning empty data:', error);
    return { subjects: [] };
  }
}

export async function updateTopicStatus(topicId: string, status: TopicStatus): Promise<Topic> {
  const { data } = await api.patch(`/academics/topics/${topicId}/status`, { status });
  return data;
}

export async function getSubjectProgress(subjectId: string): Promise<number> {
  const { data } = await api.get(`/academics/subjects/${subjectId}/progress`);
  return data.progress;
}
