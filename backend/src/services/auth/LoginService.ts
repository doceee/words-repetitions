import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ActivityType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

import { LoginDto } from '../../dto/auth/LoginDto';
import { generateToken } from '../../helpers/csrf-token';
import { PrismaService } from '../PrismaService';
import { StoreService } from '../user-activities/StoreService';
import { UpdateConsecutiveActivityDaysService } from '../user-activities/UpdateConsecutiveActivityDaysService';
import { CSRF_TOKEN_HEADER } from '../../config/constants';
import { type SessionData } from '../../types/common';

@Injectable()
export class LoginService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly storeUserActivityService: StoreService,
        private readonly updateConsecutiveActivityDaysService: UpdateConsecutiveActivityDaysService
    ) {}

    async handle(data: LoginDto, req: Request, res: Response) {
        const { email, password } = data;

        const user = await this.prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        const isValid = await bcrypt.compare(password, user.hash);

        if (!isValid) {
            throw new UnauthorizedException();
        }

        await this.storeUserActivityService.handle(
            { activity: ActivityType.login },
            user.id
        );

        await this.updateConsecutiveActivityDaysService.handle(user.id);

        const updatedUser = await this.prisma.user.findUnique({
            where: { id: user.id }
        });

        const token = generateToken();

        req.user = updatedUser;

        if (!req.session) {
            req.session = {} as SessionData;
        }

        req.session.user = user;

        if (!req.session.tokens || !req.session.tokens.length) {
            req.session.tokens = [token];
        } else if (!req.session.tokens.includes(token)) {
            req.session.tokens.push(token);
        }

        res.setHeader(CSRF_TOKEN_HEADER, token);

        return updatedUser;
    }
}
