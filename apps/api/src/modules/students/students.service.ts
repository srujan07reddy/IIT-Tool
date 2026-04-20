import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { StudentsRepository } from './students.repository';
import { StudentEntity } from './entities/student.entity';
import { CreateStudentDto, UpdateStudentDto } from '@coaching-ops/types';

/**
 * StudentsService
 * The primary engine for Student operations.
 * Implements business rules and coordinates between the repository and controllers.
 */
@Injectable()
export class StudentsService {
  constructor(private readonly studentsRepo: StudentsRepository) {}

  /**
   * create
   * Orchestrates the creation of a student and their parent details.
   */
  async create(dto: CreateStudentDto): Promise<StudentEntity> {
    // 1. Check for duplicate roll numbers or emails
    const existing = await this.studentsRepo.findOne({
      where: [{ rollNumber: dto.rollNumber }, { email: dto.email }]
    });

    if (existing) {
      throw new ConflictException('Student with this Roll Number or Email already exists');
    }

    // 2. Create the entity instance
    const student = this.studentsRepo.create(dto);

    // 3. Save (TypeORM will handle the ParentEntity cascade automatically)
    return this.studentsRepo.save(student);
  }

  /**
   * findOne
   * Fetches the 360-degree profile.
   */
  async findOne(id: string): Promise<StudentEntity> {
    const student = await this.studentsRepo.findFullProfile(id);
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  /**
   * update
   * Partial updates for student data.
   */
  async update(id: string, dto: UpdateStudentDto): Promise<StudentEntity> {
    const student = await this.findOne(id);
    this.studentsRepo.merge(student, dto);
    return this.studentsRepo.save(student);
  }

  /**
   * remove
   * Executes a Soft Delete as defined in our BaseEntity.
   */
  async remove(id: string): Promise<void> {
    const student = await this.findOne(id);
    await this.studentsRepo.softRemove(student);
  }
}