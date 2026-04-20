import { 
  Controller, 
  Get, 
  Post, 
  Patch, 
  Delete, 
  Body, 
  Param, 
  ParseUUIDPipe,
  Query
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto, UpdateStudentDto } from '@coaching-ops/types';

/**
 * StudentsController
 * Exposes the Student Master CRUD API.
 * All routes are protected by the global JWT Guard by default.
 */
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  /**
   * POST /students
   * Creates a new student profile with parent details.
   */
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  /**
   * GET /students/:id
   * Fetches the full 360-degree profile for a specific student.
   */
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.studentsService.findOne(id);
  }

  /**
   * PATCH /students/:id
   * Updates specific fields of a student record.
   */
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateStudentDto: UpdateStudentDto
  ) {
    return this.studentsService.update(id, updateStudentDto);
  }

  /**
   * DELETE /students/:id
   * Performs a soft-delete (the record stays in DB but is hidden from queries).
   */
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.studentsService.remove(id);
  }
}