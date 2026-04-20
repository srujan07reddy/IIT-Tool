import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { RoleEntity } from '../../users/entities/role.entity';
import { UserRole } from '@coaching-ops/types';

/**
 * UserEntity
 * Represents a system user (Staff/Admin).
 * Extends BaseEntity to automatically include id, createdAt, updatedAt, and deletedAt.
 */
@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ select: false }) // Password is hidden from queries by default for safety
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.FACULTY,
  })
  roleType: UserRole;

  /**
   * Relationship to the detailed Role/Permissions table.
   * This allows for granular access control beyond just the roleType enum.
   */
  @ManyToOne(() => RoleEntity, { nullable: true })
  @JoinColumn({ name: 'roleId' })
  role?: RoleEntity;

  @Column({ nullable: true })
  roleId?: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  lastLogin?: Date;
}