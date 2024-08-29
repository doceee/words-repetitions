import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Inject,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { type Response, type Request } from 'express';
import { ILucia } from '../plugins/lucia';
import { LuciaFactory } from '../modules/lucia.module';
import { PrismaService } from '../services/PrismaService';

@Injectable()
export class LoggedUserGuard implements CanActivate {
    constructor(
        @Inject(LuciaFactory) private readonly lucia: ILucia,
        private readonly prisma: PrismaService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<Request>();
        const res = context.switchToHttp().getResponse<Response>();
        const {
            headers: { 'csrf-token': token },
            method,
            url
        } = req;

        const sessionId = this.lucia.readSessionCookie(
            req.headers.cookie ?? ''
        );

        if (!sessionId) {
            throw new UnauthorizedException();
        }

        const { session } = await this.lucia.validateSession(sessionId);

        if (!session) {
            throw new UnauthorizedException();
        }

        if (session.fresh) {
            const sessionCookie = this.lucia.createSessionCookie(session.id);
            res.appendHeader('Set-Cookie', sessionCookie.serialize());
        }

        const user = await this.prisma.user.findUnique({
            where: { id: session.userId }
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

        if (!token || token !== session.token) {
            throw new ForbiddenException();
        }

        return true;
    }
}
