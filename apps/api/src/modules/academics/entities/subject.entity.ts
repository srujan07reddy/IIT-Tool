import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { ChapterEntity } from './chapter.entity';
import { BatchEntity } from './batch.entity';

/**
 * SubjectEntity
 * The root of the academic hierarchy (e.g., Physics, Chemistry).
 */
@Entity('subjects')
export class SubjectEntity extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  code: string; // e.g., 'PHY-01'

  @ManyToOne(() => BatchEntity, (batch) => batch.subjects, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'batchId' })
  batch?: BatchEntity | null;

  @Column({ nullable: true })
  batchId?: string | null;

  @Column({ type: 'text', nullable: true })
  description: string;

  /**
   * Relationship to Chapters
   * A subject contains multiple chapters.
   */
  @OneToMany(() => ChapterEntity, (chapter) => chapter.subject)
  chapters: ChapterEntity[];

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'int', default: 0 })
  displayOrder: number; // Used for sorting subjects in the UI
}
