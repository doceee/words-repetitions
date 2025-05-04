import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from '../../dto/auth/RegisterDto';
import { PrismaService } from '../PrismaService';
import { ActivityType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { generateToken } from '../../helpers/csrf-token';
import { StoreService } from '../user-activities/StoreService';
import { CSRF_TOKEN_HEADER } from '../../config/constants';
import { type SessionData } from '../../types/common';

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

        const hash = await bcrypt.hash(password, 12);

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

        if (!req.session) {
            req.session = {} as SessionData;
        }

        req.session.user = userItem.id;

        if (!req.session.tokens || !req.session.tokens.length) {
            req.session.tokens = [token];
        } else if (!req.session.tokens.includes(token)) {
            req.session.tokens.push(token);
        }

        res.setHeader(CSRF_TOKEN_HEADER, token);

        return createdUser;
    }
}
