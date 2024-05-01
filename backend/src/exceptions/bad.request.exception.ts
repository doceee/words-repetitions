import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class BadRequestException extends HttpException {
    constructor(validationErrors: ValidationError[] = []) {
        super(
            {
                errors: validationErrors.map(error => ({
                    param: error.property,
                    msg: Object.values(error.constraints)[0]
                }))
            },
            HttpStatus.BAD_REQUEST
        );
    }
}
