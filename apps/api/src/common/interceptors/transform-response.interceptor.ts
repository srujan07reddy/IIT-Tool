import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, { success: true; message: string; data: T }>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<{ success: true; message: string; data: T }> {
    const action = `${context.getClass().name}.${context.getHandler().name}`;

    return next.handle().pipe(
      map((data) => ({
        success: true as const,
        message: `${action} completed successfully`,
        data,
      })),
    );
  }
}
