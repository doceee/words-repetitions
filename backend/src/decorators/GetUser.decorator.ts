import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { type Request } from 'express';
import { type User } from '@prisma/client';

export const GetUser = createParamDecorator(
    (data: keyof User | undefined, context: ExecutionContext) => {
        const request: Request = context.switchToHttp().getRequest();

        if (data) {
            return request.user[data];
        }

        return request.user;
    }
);
