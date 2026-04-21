import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { StudentEntity } from './student.entity';
import { DocumentType, VerificationStatus } from '@coaching-ops/types';

/**
 * DocumentEntity
 * Stores links to uploaded files (photos, IDs) and their verification status.
 */
@Entity('student_documents')
export class DocumentEntity extends BaseEntity {
  @Column({
    type: 'enum',
    enum: DocumentType,
  })
  documentType: DocumentType;

  @Column()
  url: string; // URL from cloud storage (e.g., S3)

  @Column({
    type: 'enum',
    enum: VerificationStatus,
    default: VerificationStatus.PENDING,
  })
  verificationStatus: VerificationStatus;

  @Column({ nullable: true })
  remarks: string; // For admins to add notes on rejection

  @Column()
  studentId: string;

  @ManyToOne(() => StudentEntity, (student) => student.documents, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'studentId' })
  student: StudentEntity;
}