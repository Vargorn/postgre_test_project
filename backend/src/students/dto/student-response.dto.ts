import { ApiProperty } from '@nestjs/swagger';

export class StudentResponseDto {
  @ApiProperty({ example: 1, description: 'Student ID' })
  id: number;

  @ApiProperty({ example: 'John Doe', description: 'Student full name' })
  name: string;

  @ApiProperty({ example: 'john@example.com', description: 'Student email' })
  email: string;

  @ApiProperty({ example: 20, description: 'Student age' })
  age: number;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z', description: 'Creation timestamp' })
  created_at: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z', description: 'Last update timestamp' })
  updated_at: Date;
}

export class StatisticsResponseDto {
  @ApiProperty({ example: 5, description: 'Total number of students' })
  total_students: number;

  @ApiProperty({ example: 21.5, description: 'Average age (rounded to 2 decimals)' })
  average_age: number;

  @ApiProperty({ example: 18, description: 'Minimum age' })
  min_age: number;

  @ApiProperty({ example: 25, description: 'Maximum age' })
  max_age: number;
}

export class ApiResponseDto<T> {
  @ApiProperty({ example: true, description: 'Success status' })
  success: boolean;

  @ApiProperty({ description: 'Response data' })
  data: T;
}