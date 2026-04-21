import type { LoginInput } from '@coaching-ops/validation';
import type { LoginResponse } from '@coaching-ops/types';

import { api } from '@/lib/api';
import { demoUsers } from '@/lib/mock-data';

export async function loginUser(payload: LoginInput): Promise<LoginResponse> {
  try {
    const response = await api.post<LoginResponse>('/auth/login', payload);
    return response.data;
  } catch {
    const isFaculty = payload.email.toLowerCase().includes('faculty');
    const isOperations = payload.email.toLowerCase().includes('ops');
    const user = isFaculty ? demoUsers.faculty : isOperations ? demoUsers.operations : demoUsers.admin;

    return {
      accessToken: `demo-token-${user.id}`,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }
}
