import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from '@/dto/Auth/RegisterDto';
import { UserRepository } from '@/repositories/User';
import { User } from '@/entities/User';
import { Request } from '@/types/common';

@Injectable()
export class RegisterService {
    constructor(private readonly userRepository: UserRepository) {}

    async handle(data: RegisterDto, req: Request): Promise<User> {
        const { email } = data;

        const user = await this.userRepository.findByEmail(email, {
            where: { deletedAt: null }
        });

        if (user) {
            throw new BadRequestException({
                param: 'email',
                msg: 'Użytkownik z danym emailem jest już zarejestrowany.'
            });
        }

        const createdUser = await this.userRepository.create({
            ...data
        });

        const userItem = await this.userRepository.findById(createdUser.id);

        req.user = userItem;
        req.session.user = userItem.id;

        return userItem;
    }
}
