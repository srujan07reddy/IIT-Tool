import { 
  CreateDateColumn, 
  UpdateDateColumn, 
  DeleteDateColumn, 
  PrimaryGeneratedColumn 
} from 'typeorm';

/**
 * BaseEntity
 * * Every database table in the IIT Tool extends this class.
 * It ensures a unified structure for auditing and data recovery.
 */
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  /**
   * Soft Delete Column
   * When entity.softDelete() is called, this column is populated.
   * TypeORM's find() methods will automatically filter these out 
   * unless explicitly told otherwise.
   */
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt?: Date;
}