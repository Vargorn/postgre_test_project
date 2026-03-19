export interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
  created_at: Date;
  updated_at: Date;
}

export interface StudentStatistics {
  total_students: number;
  average_age: number;
  min_age: number;
  max_age: number;
}

export interface ApiResponseDto<T> {
  success: boolean;
  data: T;
}