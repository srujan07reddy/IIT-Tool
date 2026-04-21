import type { ExamApplication } from '@coaching-ops/types';

import { demoApplications } from '@/lib/mock-data';

export async function listApplications(): Promise<ExamApplication[]> {
  return Promise.resolve(demoApplications);
}

export async function getApplication(applicationId: string): Promise<ExamApplication | null> {
  return Promise.resolve(
    demoApplications.find((application) => application.id === applicationId) ?? null,
  );
}
