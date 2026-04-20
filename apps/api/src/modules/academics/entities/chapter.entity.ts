import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { SubjectEntity } from './subject.entity';
import { TopicEntity } from './topic.entity';

/**
 * ChapterEntity
 * Represents a major unit within a subject (e.g., Kinematics).
 */
@Entity('chapters')
export class ChapterEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  learningObjective: string;

  /**
   * Relationship to Subject
   * Multiple chapters belong to one subject.
   */
  @ManyToOne(() => SubjectEntity, (subject) => subject.chapters, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subjectId' })
  subject: SubjectEntity;

  @Column()
  subjectId: string;

  /**
   * Relationship to Topics
   * A chapter is broken down into granular topics.
   */
  @OneToMany(() => TopicEntity, (topic) => topic.chapter)
  topics: TopicEntity[];

  @Column({ type: 'int', default: 0 })
  displayOrder: number;

  @Column({ default: true })
  isActive: boolean;
}