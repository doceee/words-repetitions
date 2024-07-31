import {
    ValidationPipe,
    BadRequestException,
    type ValidationError
} from '@nestjs/common';

export const useValidationPipe = app => {
    app.useGlobalPipes(
        new ValidationPipe({
            skipUndefinedProperties: false,
            skipMissingProperties: false,
            skipNullProperties: false,
            disableErrorMessages: false,
            forbidUnknownValues: false,
            validationError: { target: true, value: false },
            dismissDefaultMessages: true,
            stopAtFirstError: true,
            exceptionFactory(validationErrors: ValidationError[] = []) {
                const res = {
                    msg: validationErrors[0].constraints[
                        Object.keys(validationErrors[0].constraints)[0]
                    ],
                    param: validationErrors[0].property
                };

                return new BadRequestException(res);
            }
        })
    );
};
