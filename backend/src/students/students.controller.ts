import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AgeRangeDto } from './dto/age-range.dto';
import { Student, StudentStatistics, ApiResponseDto } from './interfaces/student.interface';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all students' })
  @ApiResponse({ status: 200, description: 'List of students retrieved successfully' })
  async findAll(): Promise<ApiResponseDto<Student[]>> {
    const students = await this.studentsService.findAll();
    return {
      success: true,
      data: students,
    };
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get student statistics' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved successfully' })
  async getStatistics(): Promise<ApiResponseDto<StudentStatistics>> {
    const statistics = await this.studentsService.getStatistics();
    return {
      success: true,
      data: statistics,
    };
  }

  @Get('age-range')
  @ApiOperation({ summary: 'Get students by age range' })
  @ApiResponse({ status: 200, description: 'Students in age range retrieved successfully' })
  async findByAgeRange(@Query() ageRangeDto: AgeRangeDto): Promise<ApiResponseDto<Student[]>> {
    const { minAge, maxAge } = ageRangeDto;
    const students = await this.studentsService.findByAgeRange(minAge, maxAge);
    return {
      success: true,
      data: students,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get student by ID' })
  @ApiParam({ name: 'id', type: 'integer' })
  @ApiResponse({ status: 200, description: 'Student found' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ApiResponseDto<Student>> {
    const student = await this.studentsService.findOne(id);
    return {
      success: true,
      data: student,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new student' })
  @ApiBody({ type: CreateStudentDto })
  @ApiResponse({ status: 201, description: 'Student created successfully' })
  @ApiResponse({ status: 400, description: 'Validation error or email already exists' })
  async create(@Body() createStudentDto: CreateStudentDto): Promise<ApiResponseDto<Student>> {
    const student = await this.studentsService.create(createStudentDto);
    return {
      success: true,
      data: student,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a student' })
  @ApiParam({ name: 'id', type: 'integer' })
  @ApiBody({ type: UpdateStudentDto })
  @ApiResponse({ status: 200, description: 'Student updated successfully' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<ApiResponseDto<Student>> {
    const student = await this.studentsService.update(id, updateStudentDto);
    return {
      success: true,
      data: student,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a student' })
  @ApiParam({ name: 'id', type: 'integer' })
  @ApiResponse({ status: 204, description: 'Student deleted successfully' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.studentsService.remove(id);
  }
}