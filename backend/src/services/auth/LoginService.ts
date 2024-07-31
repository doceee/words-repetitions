import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from '@/dto/Auth/LoginDto';
import { UserRepository } from '@/repositories/User';
import { User } from '@/entities/User';
import { Request } from '@/types/common';

@Injectable()
export class LoginService {
    constructor(private readonly userRepository: UserRepository) {}

    async handle(data: LoginDto, req: Request): Promise<User> {
        const { email, password } = data;

        const user = await this.userRepository.findByEmail(email, {
            select: { password: true }
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            throw new UnauthorizedException();
        }

        const userItem = await this.userRepository.findByEmail(email);

        req.user = userItem;
        req.session.user = userItem.id;

        return userItem;
    }
}
