import { GetLoggedUserService } from '../services/auth/GetLoggedUser';
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { Request } from '../types/common';

@Injectable()
export class LoggedUserGuard implements CanActivate {
    constructor(private getLoggedUserService: GetLoggedUserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<Request>();

        const {
            session: { user: userId },
            headers: { uid }
        } = req;

        if (!userId || !uid || uid !== userId) {
            throw new UnauthorizedException();
        }

        const user = await this.getLoggedUserService.handle(req);

        if (!user) {
            throw new UnauthorizedException();
        }

        req.user = user;

        return true;
    }
}
