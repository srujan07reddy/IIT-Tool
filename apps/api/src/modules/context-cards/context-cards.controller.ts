import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { contextCardSchema } from '@coaching-ops/validation';
import type { ContextCard } from '@coaching-ops/types';

import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { GlobalValidationPipe } from '../../common/pipes/validation.pipe';
import { ContextCardsService } from './context-cards.service';

@Controller('context-cards')
export class ContextCardsController {
  constructor(private readonly contextCardsService: ContextCardsService) {}

  @Post()
  async create(
    @CurrentUser('userId') userId: string,
    @Body(new GlobalValidationPipe(contextCardSchema as any))
    payload: Omit<ContextCard, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'createdBy'>,
  ) {
    return this.contextCardsService.create({
      ...(payload as ContextCard),
      createdBy: userId,
    });
  }

  @Get('topic/:topicId')
  async findByTopic(@Param('topicId', ParseUUIDPipe) topicId: string) {
    return this.contextCardsService.findByTopic(topicId);
  }
}
