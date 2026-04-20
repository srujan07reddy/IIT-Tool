import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

/**
 * GlobalValidationPipe
 * This pipe uses the shared Zod schemas from Phase 1 to enforce 
 * data integrity across all API endpoints. [cite: 894, 1059]
 */
@Injectable()
export class GlobalValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      // Validates the incoming data (value) against the injected Zod schema
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      // If validation fails, it throws a 400 Bad Request error 
      // providing the exact field that failed. [cite: 881, 1059]
      throw new BadRequestException({
        message: 'Validation failed',
        errors: (error as any).errors,
      });
    }
  }
}