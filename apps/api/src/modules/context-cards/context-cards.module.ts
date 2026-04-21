import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TopicEntity } from '../academics/entities/topic.entity';
import { UserEntity } from '../auth/entities/user.entity';
import { ContextCardsController } from './context-cards.controller';
import { ContextCardsService } from './context-cards.service';
import { ContextCardEntity } from './entities/context-card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContextCardEntity, TopicEntity, UserEntity])],
  controllers: [ContextCardsController],
  providers: [ContextCardsService],
  exports: [ContextCardsService],
})
export class ContextCardsModule {}
