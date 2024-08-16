import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from '../../dto/auth/LoginDto';
import { PrismaService } from '../prisma.service';
import { Request } from '../../types/common';

@Injectable()
export class LoginService {
    constructor(private readonly prisma: PrismaService) {}

    async handle(data: LoginDto, req: Request) {
        const { email, password } = data;

        const user = await this.prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        const isValid = bcrypt.compareSync(password, user.hash);

        if (!isValid) {
            throw new UnauthorizedException();
        }

        req.user = user;
        req.session.user = user.id;

        return user;
    }
}
