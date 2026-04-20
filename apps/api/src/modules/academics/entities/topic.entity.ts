import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { ChapterEntity } from './chapter.entity';
import { TopicStatus } from '@coaching-ops/types';

/**
 * TopicEntity
 * The leaf node of the hierarchy.
 * This is where teaching progress is tracked.
 */
@Entity('topics')
export class TopicEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  contentSummary: string; // Brief overview for context generation

  /**
   * Relationship to Chapter
   * Every topic belongs to a specific chapter.
   */
  @ManyToOne(() => ChapterEntity, (chapter) => chapter.topics, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chapterId' })
  chapter: ChapterEntity;

  @Column()
  chapterId: string;

  /**
   * Tracking Status
   * Defined in Phase 1 types: PENDING, IN_PROGRESS, COMPLETED
   */
  @Column({
    type: 'enum',
    enum: TopicStatus,
    default: TopicStatus.PENDING,
  })
  status: TopicStatus;

  @Column({ type: 'int', default: 0 })
  displayOrder: number;

  @Column({ type: 'int', nullable: true })
  estimatedHours: number; // Time allotted for this topic in the planner

  @Column({ default: true })
  isActive: boolean;
}