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
export class CatchEverythingFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const logger = new Logger('CatchEverythingFilter');

        const ctx = host.switchToHttp();

        const httpStatus =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const message =
            typeof exception.getResponse() === 'string'
                ? exception.getResponse()
                : JSON.stringify(exception.getResponse());

        const errorMessage =
            typeof message === 'string' ? message : JSON.stringify(message);
        const isBadRequest = httpStatus === HttpStatus.BAD_REQUEST;

        logger.error(
            `Method: ${request.method} | URL: ${request.url} | Status: ${httpStatus} | Message: ${errorMessage}`
        );

        if (isBadRequest && exception instanceof HttpException) {
            const res = exception.getResponse();

            return response.status(httpStatus).send(res);
        }

        return response.status(httpStatus).send({
            message
        });
    }
}
