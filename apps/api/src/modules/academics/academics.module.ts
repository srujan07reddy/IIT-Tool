import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AcademicsController } from './academics.controller';
import { AcademicsService } from './academics.service';
import { BatchEntity } from './entities/batch.entity';
import { ChapterEntity } from './entities/chapter.entity';
import { SubjectEntity } from './entities/subject.entity';
import { TopicEntity } from './entities/topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BatchEntity, SubjectEntity, ChapterEntity, TopicEntity])],
  controllers: [AcademicsController],
  providers: [AcademicsService],
  exports: [AcademicsService],
})
export class AcademicsModule {}
