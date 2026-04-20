import { Entity, Column, OneToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { ParentEntity } from './parent.entity';
import { StudentStatus, Gender } from '@coaching-ops/types';

/**
 * StudentEntity
 * The central record for a student. 
 * Includes high-level indexing on rollNumber and email for fast lookups.
 */
@Entity('students')
export class StudentEntity extends BaseEntity {
  @Index({ unique: true })
  @Column()
  rollNumber: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Index({ unique: true })
  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column({
    type: 'enum',
    enum: Gender,
  })
  gender: Gender;

  @Column({
    type: 'enum',
    enum: StudentStatus,
    default: StudentStatus.PROSPECT,
  })
  status: StudentStatus;

  /**
   * Academic Connection
   * Linking the student to a specific batch or course.
   */
  @Column()
  currentBatchId: string;

  @Column({ nullable: true })
  enrollmentDate: Date;

  /**
   * One-to-One Relationship with Parent/Guardian details
   * This keeps the student table lean while allowing 
   * deep access to emergency contacts.
   */
  @OneToOne(() => ParentEntity, (parent) => parent.student, { cascade: true })
  @JoinColumn()
  parentDetails: ParentEntity;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>; // For flexible fields like "Previous School" or "Interests"
}