import {
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { UserRepository } from '../../user/user.repository';

@Injectable()
export class LoggedInGuard {
    constructor(private readonly userRepository: UserRepository) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        const {
            session: { user: userId },
            headers: { uid }
        } = request;

        if (!userId || !uid || uid !== userId) {
            throw new UnauthorizedException();
        }

        const loggedUser = await this.userRepository.getById(userId);

        if (!loggedUser) {
            throw new UnauthorizedException();
        }

        delete loggedUser.hash;

        request.user = loggedUser;

        return true;
    }
}
