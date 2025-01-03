import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from '../../dto/auth/RegisterDto';
import { PrismaService } from '../PrismaService';
import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { generateToken } from '../../helpers/csrf-token';
import { ActivityType } from '@prisma/client';
import { StoreService } from '../user-activities/StoreService';
import { Session } from 'express-session';

@Injectable()
export class RegisterService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly storeUserActivityService: StoreService
    ) {}

    async handle(data: RegisterDto, req: Request, res: Response) {
        const { email, password } = data;

        const user = await this.prisma.user.findUnique({
            where: { email }
        });

        if (user) {
            throw new BadRequestException({
                param: 'email',
                msg: 'Użytkownik z danym emailem jest już zarejestrowany.'
            });
        }

        const hash = bcrypt.hashSync(password, 12);

        const createdUser = await this.prisma.user.create({
            data: { email, hash }
        });

        await this.storeUserActivityService.handle(
            { activity: ActivityType.login },
            createdUser.id
        );

        const userItem = await this.prisma.user.findUnique({
            where: { id: createdUser.id }
        });

        const token = generateToken();

        req.user = userItem;
        req.session =
            req.session || ({} as Session & { user?: string; token?: string });
        req.session.user = userItem.id;

        if (!req.session.tokens || !req.session.tokens.length) {
            req.session.tokens = [token];
        } else if (!req.session.tokens.includes(token)) {
            req.session.tokens.push(token);
        }

        res.setHeader('csrf-token', token);

        return createdUser;
    }
}
