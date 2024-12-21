import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../services/PrismaService';

@Injectable()
export class LoggedUserGuard implements CanActivate {
    constructor(private readonly prisma: PrismaService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<Request>();
        const {
            headers: { 'csrf-token': token },
            method,
            url,
            session: { user: userId, tokens }
        } = req;

        if (!userId) {
            throw new UnauthorizedException();
        }

        const user = await this.prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        req.user = user;

        if (
            !['DELETE', 'PUT', 'POST', 'PATCH'].includes(method) ||
            url.split('/').some(part => ['login', 'register'].includes(part))
        ) {
            return true;
        }

        if (!token || !tokens || !tokens.includes(token)) {
            throw new ForbiddenException('Invalid CSRF token');
        }

        return true;
    }
}
