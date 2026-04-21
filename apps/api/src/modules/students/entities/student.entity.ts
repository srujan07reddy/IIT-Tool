import { Entity, Column, OneToOne, JoinColumn, Index, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { ParentEntity } from './parent.entity';
import { StudentStatus, Gender, StudentCategory } from '@coaching-ops/types';
import { BatchEntity } from '../../academics/entities/batch.entity';
import { DocumentEntity } from './document.entity';
 
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

  @Column({
    type: 'enum',
    enum: StudentCategory,
    default: StudentCategory.GENERAL,
  })
  category: StudentCategory;

  /**
   * Academic Connection
   * Linking the student to a specific batch or course.
   */
  @Column()
  currentBatchId: string;

  @ManyToOne(() => BatchEntity, (batch) => batch.students, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'currentBatchId' })
  batch: BatchEntity;

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

  /**
   * One-to-Many relationship with uploaded documents.
   */
  @OneToMany(() => DocumentEntity, (doc) => doc.student, { cascade: true })
  documents: DocumentEntity[];

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>; // For flexible fields like "Previous School" or "Interests"
}
