import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { StudentEntity } from './entities/student.entity';
import { StudentStatus } from '@coaching-ops/types';

/**
 * StudentsRepository
 * Custom repository for specialized Student queries.
 * Handles the "heavy lifting" of database lookups and joins.
 */
@Injectable()
export class StudentsRepository extends Repository<StudentEntity> {
  constructor(private dataSource: DataSource) {
    super(StudentEntity, dataSource.createEntityManager());
  }

  /**
   * findFullProfile
   * Fetches a student along with their parent details.
   * Essential for the "Student 360" view in the frontend.
   */
  async findFullProfile(id: string): Promise<StudentEntity | null> {
    return this.findOne({
      where: { id },
      relations: ['parentDetails'],
    });
  }

  /**
   * findByRollNumber
   * Specialized lookup for search bars and QR-based attendance.
   */
  async findByRollNumber(rollNumber: string): Promise<StudentEntity | null> {
    return this.findOne({
      where: { rollNumber },
      relations: ['parentDetails'],
    });
  }

  /**
   * getActiveStudentsByBatch
   * Filters out soft-deleted students and returns those in a specific batch.
   */
  async getActiveStudentsByBatch(batchId: string): Promise<StudentEntity[]> {
    return this.find({
      where: {
        currentBatchId: batchId,
        status: StudentStatus.ACTIVE,
      },
    });
  }
}