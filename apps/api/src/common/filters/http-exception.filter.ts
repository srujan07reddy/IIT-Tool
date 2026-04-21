import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (exception instanceof QueryFailedError) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Database operation failed',
        error: {
          detail: (exception as QueryFailedError & { detail?: string }).detail ?? exception.message,
        },
        path: request.url,
        timestamp: new Date().toISOString(),
      });
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const payload = exception.getResponse();
      const message =
        typeof payload === 'object' && payload !== null && 'message' in payload
          ? (payload as { message: string | string[] }).message
          : exception.message;

      return response.status(status).json({
        success: false,
        message,
        error: payload,
        path: request.url,
        timestamp: new Date().toISOString(),
      });
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Internal server error',
      error: exception instanceof Error ? exception.message : exception,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
