import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student, StudentStatistics } from './interfaces/student.interface';

@Injectable()
export class StudentsService {
  private readonly logger = new Logger(StudentsService.name);

  constructor(private readonly db: DatabaseService) {}

  async findAll(): Promise<Student[]> {
    try {
      this.logger.log('Fetching all students');
      const students = await this.db.callFunction<Student>('fn_get_all_students');
      return students;
    } catch (error) {
      this.logger.error('Failed to fetch students', error.stack);
      throw new BadRequestException('Failed to fetch students');
    }
  }

  async findOne(id: number): Promise<Student> {
    try {
      this.logger.log(`Fetching student with id: ${id}`);
      const students = await this.db.callFunction<Student>('fn_get_student_by_id', [id]);
      
      if (!students || students.length === 0) {
        throw new NotFoundException(`Student with ID ${id} not found`);
      }
      
      return students[0];
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Failed to fetch student with id ${id}`, error.stack);
      throw new BadRequestException('Failed to fetch student');
    }
  }

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    try {
      this.logger.log('Creating new student', createStudentDto);
      const { name, email, age } = createStudentDto;
      
      const students = await this.db.callFunction<Student>(
        'fn_create_student',
        [name, email, age]
      );
      
      if (!students || students.length === 0) {
        throw new BadRequestException('Failed to create student');
      }
      
      return students[0];
    } catch (error) {
      this.logger.error('Failed to create student', error.stack);
      
      if (error.code === '23505') {
        throw new BadRequestException('Email already exists');
      }
      
      if (error.code === '23514') {
        throw new BadRequestException('Age must be between 1 and 120');
      }
      
      throw new BadRequestException(error.message || 'Failed to create student');
    }
  }

  async update(id: number, updateStudentDto: UpdateStudentDto): Promise<Student> {
    try {
      this.logger.log(`Updating student with id: ${id}`, updateStudentDto);
      
      await this.findOne(id);
      
      const { name, email, age } = updateStudentDto;
      
      const students = await this.db.callFunction<Student>(
        'fn_update_student',
        [id, name || null, email || null, age || null]
      );
      
      if (!students || students.length === 0) {
        throw new BadRequestException('Failed to update student');
      }
      
      return students[0];
    } catch (error) {
      this.logger.error(`Failed to update student with id ${id}`, error.stack);
      
      if (error instanceof NotFoundException) {
        throw error;
      }
      
      if (error.code === '23505') {
        throw new BadRequestException('Email already exists');
      }
      
      if (error.code === '23514') {
        throw new BadRequestException('Age must be between 1 and 120');
      }
      
      throw new BadRequestException(error.message || 'Failed to update student');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      this.logger.log(`Deleting student with id: ${id}`);
      await this.findOne(id);
      await this.db.callFunction('fn_delete_student', [id]);
    } catch (error) {
      this.logger.error(`Failed to delete student with id ${id}`, error.stack);
      
      if (error instanceof NotFoundException) {
        throw error;
      }
      
      throw new BadRequestException('Failed to delete student');
    }
  }

  async findByAgeRange(minAge: number, maxAge: number): Promise<Student[]> {
    try {
      this.logger.log(`Finding students by age range: ${minAge}-${maxAge}`);
      
      if (minAge > maxAge) {
        throw new BadRequestException('Min age cannot be greater than max age');
      }
      
      const students = await this.db.callFunction<Student>(
        'fn_get_students_by_age_range',
        [minAge, maxAge]
      );
      
      return students;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      this.logger.error('Failed to fetch students by age range', error.stack);
      throw new BadRequestException('Failed to fetch students by age range');
    }
  }

  async getStatistics(): Promise<StudentStatistics> {
    try {
      this.logger.log('Fetching student statistics');
      const stats = await this.db.callFunction<StudentStatistics>('fn_get_student_statistics');
      
      if (!stats || stats.length === 0) {
        return {
          total_students: 0,
          average_age: 0,
          min_age: 0,
          max_age: 0,
        };
      }
      
      return stats[0];
    } catch (error) {
      this.logger.error('Failed to fetch statistics', error.stack);
      throw new BadRequestException('Failed to fetch statistics');
    }
  }
}