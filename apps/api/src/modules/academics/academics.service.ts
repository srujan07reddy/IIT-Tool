import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubjectEntity } from './entities/subject.entity';
import { ChapterEntity } from './entities/chapter.entity';
import { TopicEntity } from './entities/topic.entity';
import { TopicStatus } from '@coaching-ops/types';

/**
 * AcademicsService
 * Manages the curriculum hierarchy and progress tracking.
 */
@Injectable()
export class AcademicsService {
  constructor(
    @InjectRepository(SubjectEntity)
    private subjectRepo: Repository<SubjectEntity>,
    @InjectRepository(ChapterEntity)
    private chapterRepo: Repository<ChapterEntity>,
    @InjectRepository(TopicEntity)
    private topicRepo: Repository<TopicEntity>,
  ) {}

  /**
   * getFullSyllabusTree
   * Fetches all subjects with nested chapters and topics.
   * Used for the main Syllabus Tracker dashboard.
   */
  async getFullSyllabusTree() {
    return this.subjectRepo.find({
      relations: ['chapters', 'chapters.topics'],
      order: {
        displayOrder: 'ASC',
        chapters: {
          displayOrder: 'ASC',
          topics: { displayOrder: 'ASC' }
        }
      }
    });
  }

  /**
   * updateTopicStatus
   * The core function for the tracker. Updates if a topic is 
   * PENDING, IN_PROGRESS, or COMPLETED.
   */
  async updateTopicStatus(topicId: string, status: TopicStatus): Promise<TopicEntity> {
    const topic = await this.topicRepo.findOne({ where: { id: topicId } });
    if (!topic) throw new NotFoundException('Topic not found');
    
    topic.status = status;
    return this.topicRepo.save(topic);
  }

  /**
   * getSubjectProgress
   * Calculates the completion percentage for a specific subject.
   */
  async getSubjectProgress(subjectId: string) {
    const topics = await this.topicRepo.find({
      where: { chapter: { subjectId: subjectId } }
    });
    
    if (topics.length === 0) return 0;
    
    const completed = topics.filter(t => t.status === TopicStatus.COMPLETED).length;
    return Math.round((completed / topics.length) * 100);
  }
}