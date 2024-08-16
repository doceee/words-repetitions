import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from '../../dto/auth/LoginDto';
import { PrismaService } from '../PrismaService';
import { Request } from '../../types/common';
import { LuciaFactory } from '../../modules/lucia.module';
import { type ILucia } from '../../plugins/lucia';
import { type Response } from 'express';

@Injectable()
export class LoginService {
    constructor(
        @Inject(LuciaFactory) private readonly lucia: ILucia,
        private readonly prisma: PrismaService
    ) {}

    async handle(data: LoginDto, req: Request, res: Response) {
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

        const session = await this.lucia.createSession(user.id, {});

        const sessionCookie = this.lucia.createSessionCookie(session.id);

        res.appendHeader('Set-Cookie', sessionCookie.serialize());

        return user;
    }
}
