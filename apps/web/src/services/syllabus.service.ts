import type { SubjectHierarchy, TopicStatus } from '@coaching-ops/types';

import { syllabusHierarchy } from '@/lib/mock-data';

export async function getSyllabusHierarchy(): Promise<SubjectHierarchy[]> {
  return Promise.resolve(syllabusHierarchy);
}

export async function updateTopicStatus(
  topicId: string,
  status: TopicStatus,
): Promise<SubjectHierarchy[]> {
  for (const subject of syllabusHierarchy) {
    for (const chapter of subject.chapters) {
      const topic = chapter.topics.find((item) => item.id === topicId);
      if (topic?.progress) {
        topic.progress.status = status;
      }
    }
  }

  return Promise.resolve(syllabusHierarchy);
}
