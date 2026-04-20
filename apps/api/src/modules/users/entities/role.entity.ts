import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Permission } from '@coaching-ops/types';

/**
 * RoleEntity
 * Defines a specific role and its associated permissions.
 * Extends BaseEntity for standardized tracking and soft-deletion.
 */
@Entity('roles')
export class RoleEntity extends BaseEntity {
  @Column({ unique: true })
  name: string; // e.g., 'Senior Faculty', 'Ops Lead'

  @Column({ nullable: true })
  description: string;

  /**
   * Permissions Array
   * Stores an array of permission strings defined in your Phase 1 types.
   * e.g., ['syllabus:write', 'student:read', 'assessment:publish']
   */
  @Column('jsonb', { default: [] })
  permissions: Permission[];

  @Column({ default: true })
  isSystemRole: boolean; // Protects core roles (ADMIN, FACULTY) from deletion
}