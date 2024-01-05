import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../../user/user.repository';

@Injectable()
export class LoggedInGuard {
  constructor(private readonly userRepository: UserRepository) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const {
      session: { user },
      headers: { uid },
    } = request;

    if (!user || !uid || uid !== user) {
      throw new UnauthorizedException();
    }

    const loggedUser = await this.userRepository.getById(user);

    if (!loggedUser) {
      throw new UnauthorizedException();
    }

    delete loggedUser.hash;

    request.user = loggedUser;

    return true;
  }
}
