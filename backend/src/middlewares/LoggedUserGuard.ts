import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { Request } from '../types/common';
import { ILucia } from '../plugins/lucia';
import { LuciaFactory } from '../modules/lucia.module';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class LoggedUserGuard implements CanActivate {
    constructor(
        @Inject(LuciaFactory) private readonly lucia: ILucia,
        private readonly prisma: PrismaService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<Request>();
        const {
            headers: { uid }
        } = req;
        const sessionId = this.lucia.readSessionCookie(
            req.headers.cookie ?? ''
        );

        if (!sessionId || !uid) {
            throw new UnauthorizedException();
        }

        const { session } = await this.lucia.validateSession(sessionId);

        if (!session) {
            throw new UnauthorizedException();
        }

        const user = await this.prisma.user.findUnique({
            where: { id: session.userId }
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        req.user = user;

        return true;
    }
}
