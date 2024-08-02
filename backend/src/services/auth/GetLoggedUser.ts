import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/User';
import { User } from '../../entities/User';
import { Request } from '../../types/common';

@Injectable()
export class GetLoggedUserService {
    constructor(private readonly userRepository: UserRepository) {}

    async handle(req: Request): Promise<User | null> {
        const { user: userId } = req.session || {};

        if (!userId) {
            return null;
        }

        return this.userRepository.findOne({
            where: { id: userId },
            relations: {
                words: true
            }
        });
    }
}
