import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from '../types/common';

import type { User } from '../entities/User';

export const GetUser = createParamDecorator(
    (data: keyof User | undefined, context: ExecutionContext) => {
        const request: Request = context.switchToHttp().getRequest();

        if (data) {
            return request.user[data];
        }

        return request.user;
    }
);
