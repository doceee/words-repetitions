import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class ExceptionsFilter implements ExceptionFilter {
    catch(exception: HttpException | Error, host: ArgumentsHost) {
        const logger = new Logger('ExceptionsFilter');
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const message =
            exception instanceof HttpException
                ? typeof exception.getResponse() === 'string'
                    ? exception.getResponse()
                    : JSON.stringify(exception.getResponse())
                : exception.message;

        const errorMessage =
            typeof message === 'string' ? message : JSON.stringify(message);

        logger.error(
            `Method: ${request.method} | URL: ${request.url} | Status: ${status} | Message: ${errorMessage}`
        );

        response.status(status).json({
            statusCode: status,
            message
        });
    }
}
