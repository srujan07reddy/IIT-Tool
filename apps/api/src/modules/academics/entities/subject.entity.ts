import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { ChapterEntity } from './chapter.entity';

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