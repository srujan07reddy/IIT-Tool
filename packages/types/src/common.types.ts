export interface BaseEntity {
  id: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  deletedAt?: string | Date | null; 
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: any;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}