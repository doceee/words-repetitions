import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../repositories/User';
import { User } from '../../entities/User';
import { Request } from '../../types/common';

@Injectable()
export class MeService {
    constructor(private readonly userRepository: UserRepository) {}

    async handle(req: Request): Promise<User> {
        const id = req.session.user;

        if (!id) {
            throw new UnauthorizedException();
        }

        const user = this.userRepository.findOne({
            where: { id }
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
