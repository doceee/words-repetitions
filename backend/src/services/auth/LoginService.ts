import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from '../../dto/auth/LoginDto';
import { PrismaService } from '../PrismaService';
import { Request, Response } from 'express';
import { StoreService } from '../user-activities/StoreService';
import { ActivityType } from '@prisma/client';
import { UpdateConsecutiveActivityDaysService } from '../user-activities/UpdateConsecutiveActivityDaysService';
import { generateToken } from '../../helpers/csrf-token';
import { Session } from 'express-session';

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
            where: { email },
            select: { hash: true, id: true }
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        const isValid = bcrypt.compareSync(password, user.hash);

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
        req.session =
            req.session || ({} as Session & { user?: string; token?: string });
        req.session.user = user.id;

        if (!req.session.tokens || !req.session.tokens.length) {
            req.session.tokens = [token];
        } else if (!req.session.tokens.includes(token)) {
            req.session.tokens.push(token);
        }

        res.setHeader('csrf-token', token);

        return updatedUser;
    }
}
