import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { TopicEntity } from '../academics/entities/topic.entity';

/**
 * PromptService
 * Orchestrates the retrieval and preparation of AI instructions.
 * Connects the 'tools/prompts' folder to the live API.
 */
@Injectable()
export class PromptService {
  // Path to your versioned markdown prompt templates
  private readonly promptBasePath = path.join(process.cwd(), '../../tools/prompts');

  /**
   * getTemplate
   * Reads the specific markdown file for a strategy (e.g., 'analogy.md').
   */
  private async getTemplate(version: string, strategy: string): Promise<string> {
    const filePath = path.join(this.promptBasePath, version, `${strategy}.md`);
    try {
      return await fs.readFile(filePath, 'utf-8');
    } catch (error) {
      throw new InternalServerErrorException(`Prompt template ${strategy} v${version} not found.`);
    }
  }

  /**
   * buildContextPrompt
   * Injects live topic data into the template.
   */
  async buildContextPrompt(topic: TopicEntity, version = 'v1'): Promise<string> {
    const template = await this.getTemplate(version, 'context-card');

    // Simple but effective interpolation
    return template
      .replace('{{TOPIC_NAME}}', topic.name)
      .replace('{{CONTENT_SUMMARY}}', topic.contentSummary || 'Standard academic definition')
      .replace('{{CHAPTER_NAME}}', topic.chapter?.name || 'General Science');
  }
}