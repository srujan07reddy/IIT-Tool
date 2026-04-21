import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { ContextCard } from '@coaching-ops/types';
import { Repository } from 'typeorm';

import { TopicEntity } from '../academics/entities/topic.entity';
import { ContextCardEntity } from './entities/context-card.entity';

@Injectable()
export class ContextCardsService {
  constructor(
    @InjectRepository(ContextCardEntity)
    private readonly contextCardsRepository: Repository<ContextCardEntity>,
    @InjectRepository(TopicEntity)
    private readonly topicRepository: Repository<TopicEntity>,
  ) {}

  async create(payload: ContextCard): Promise<ContextCardEntity> {
    const topic = await this.topicRepository.findOne({ where: { id: payload.topicId } });
    if (!topic) {
      throw new NotFoundException('Topic not found');
    }

    const entity = this.contextCardsRepository.create({
      topicId: payload.topicId,
      createdBy: payload.createdBy,
      content: payload.content,
      isVerified: payload.isVerified ?? false,
    });

    return this.contextCardsRepository.save(entity);
  }

  async findByTopic(topicId: string): Promise<ContextCardEntity[]> {
    return this.contextCardsRepository.find({
      where: { topicId },
      order: { createdAt: 'DESC' },
    });
  }
}
