import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from '../../dto/auth/LoginDto';
import { PrismaService } from '../PrismaService';
import { LuciaFactory } from '../../modules/lucia.module';
import { type ILucia } from '../../plugins/lucia';
import { type Response, type Request } from 'express';
import { StoreService } from '../user-activities/StoreService';
import { ActivityType } from '@prisma/client';
import { UpdateConsecutiveActivityDaysService } from '../user-activities/UpdateConsecutiveActivityDaysService';

@Injectable()
export class LoginService {
    constructor(
        @Inject(LuciaFactory) private readonly lucia: ILucia,
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

        const session = await this.lucia.createSession(user.id, {});

        const sessionCookie = this.lucia.createSessionCookie(session.id);

        res.appendHeader('Set-Cookie', sessionCookie.serialize());

        await this.storeUserActivityService.handle(
            { activity: ActivityType.Login },
            user.id
        );

        await this.updateConsecutiveActivityDaysService.handle(user.id);

        const updatedUser = await this.prisma.user.findUnique({
            where: { id: user.id }
        });

        req.user = updatedUser;

        return updatedUser;
    }
}
