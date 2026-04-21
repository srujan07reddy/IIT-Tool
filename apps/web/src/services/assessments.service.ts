import type { OmrParseResult, QuestionBankItem } from '@coaching-ops/types';

import { questionBank } from '@/lib/mock-data';

export async function listQuestionBank(): Promise<QuestionBankItem[]> {
  return Promise.resolve(questionBank);
}

export async function parseOmrUploads(files: File[]): Promise<OmrParseResult[]> {
  return Promise.resolve(
    files.map((file, index) => ({
      id: `omr-result-${index + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      studentName: file.name.replace(/\.[^.]+$/, ''),
      rollNumber: `IIT-${2600 + index}`,
      status: file.name.toLowerCase().includes('bad') ? 'FAILED' : 'SUCCESS',
      reason: file.name.toLowerCase().includes('bad') ? 'Low contrast on response bubbles' : undefined,
    })),
  );
}
