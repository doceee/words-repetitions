import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../services/PrismaService';
import { CSRF_TOKEN_HEADER } from '../config/constants';

@Injectable()
export class LoggedUserGuard implements CanActivate {
    constructor(private readonly prisma: PrismaService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const { headers } = request;
        const csrfToken = headers[CSRF_TOKEN_HEADER];

        const { session } = request;
        if (!session || !session.user || !session.tokens) {
            throw new UnauthorizedException();
        }

        const { user, tokens } = session;
        const userData = request.user;

        if (!userData) {
            const userItem = await this.prisma.user.findUnique({
                where: { id: user }
            });

            if (!userItem) {
                throw new UnauthorizedException();
            }

            request.user = userItem;
        }

        const { method, url } = request;

        if (this.isNotRestrictedMethod(method, url)) {
            return true;
        }

        if (!csrfToken || !tokens.includes(csrfToken)) {
            throw new ForbiddenException('Invalid CSRF token');
        }

        return true;
    }

    private isNotRestrictedMethod(method: string, url: string) {
        const restrictedMethods = ['DELETE', 'PUT', 'POST', 'PATCH'];
        const publicUrls = ['login', 'register'];

        return (
            !restrictedMethods.includes(method) ||
            url.split('/').some(part => publicUrls.includes(part))
        );
    }
}
