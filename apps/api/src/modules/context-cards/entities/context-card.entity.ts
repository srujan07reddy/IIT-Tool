import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { TopicEntity } from '../../academics/entities/topic.entity';
import { UserEntity } from '../../auth/entities/user.entity';

/**
 * ContextCardEntity
 * Stores AI-generated teaching aids (analogies, examples, FAQs).
 */
@Entity('context_cards')
export class ContextCardEntity extends BaseEntity {
  /**
   * The specific topic this card is helping to teach.
   */
  @ManyToOne(() => TopicEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'topicId' })
  topic: TopicEntity;

  @Index()
  @Column()
  topicId: string;

  /**
   * Content stored in structured JSON format.
   * Includes: analogy, realWorldApplication, commonPitfalls, etc.
   */
  @Column({ type: 'jsonb' })
  content: {
    whyLearn: string;
    realWorldApplication: string;
  };

  /**
   * Tracking which faculty member generated or verified this card.
   */
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'createdBy' })
  creator: UserEntity;

  @Column()
  createdBy: string;

  @Column({ default: 0 })
  helpfulVotes: number; // For crowd-sourcing the best teaching strategies

  @Column({ default: false })
  isVerified: boolean; // Marked true if a Senior Faculty reviews it
}
