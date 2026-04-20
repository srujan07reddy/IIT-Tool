import { 
  Controller, 
  Get, 
  Patch, 
  Param, 
  Body, 
  ParseUUIDPipe 
} from '@nestjs/common';
import { AcademicsService } from './academics.service';
import { TopicStatus } from '@coaching-ops/types';

/**
 * AcademicsController
 * Handles requests related to the Syllabus and Academic Hierarchy.
 */
@Controller('academics')
export class AcademicsController {
  constructor(private readonly academicsService: AcademicsService) {}

  /**
   * GET /academics/syllabus
   * Returns the full nested tree: Subjects -> Chapters -> Topics.
   */
  @Get('syllabus')
  async getSyllabus() {
    return this.academicsService.getFullSyllabusTree();
  }

  /**
   * GET /academics/subjects/:id/progress
   * Returns the percentage completion for a specific subject.
   */
  @Get('subjects/:id/progress')
  async getProgress(@Param('id', ParseUUIDPipe) id: string) {
    const percentage = await this.academicsService.getSubjectProgress(id);
    return { subjectId: id, progress: percentage };
  }

  /**
   * PATCH /academics/topics/:id/status
   * Updates the teaching status of a specific topic.
   */
  @Patch('topics/:id/status')
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('status') status: TopicStatus,
  ) {
    return this.academicsService.updateTopicStatus(id, status);
  }
}