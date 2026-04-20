import { Entity, Column, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { StudentEntity } from './student.entity';

/**
 * ParentEntity
 * Stores guardian details. Linked to StudentEntity.
 * Extends BaseEntity for audit trails and soft-delete capability.
 */
@Entity('parents')
export class ParentEntity extends BaseEntity {
  @Column()
  fatherName: string;

  @Column({ nullable: true })
  motherName: string;

  @Column()
  primaryPhone: string;

  @Column({ nullable: true })
  secondaryPhone: string;

  @Column()
  email: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ nullable: true })
  occupation: string;

  /**
   * Bi-directional relationship
   * Allows us to find a student starting from a parent's record if needed.
   */
  @OneToOne(() => StudentEntity, (student) => student.parentDetails)
  student: StudentEntity;
}