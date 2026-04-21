import type { ApiResponse } from '@coaching-ops/types';

export class BaseResponseDto<T> implements ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: unknown;

  constructor(input: ApiResponse<T>) {
    this.success = input.success;
    this.data = input.data;
    this.message = input.message;
    this.error = input.error;
  }
}
