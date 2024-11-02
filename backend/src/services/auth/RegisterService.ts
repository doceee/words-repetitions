import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RegisterDto } from '../../dto/auth/RegisterDto';
import { PrismaService } from '../PrismaService';
import * as bcrypt from 'bcryptjs';
import { LuciaFactory } from '../../modules/lucia.module';
import { type Response, type Request } from 'express';
import { type ILucia } from '../../plugins/lucia';
import { generateToken } from '../../helpers/csrf-token';
import { ActivityType } from '@prisma/client';
import { StoreService } from '../user-activities/StoreService';

@Injectable()
export class RegisterService {
    constructor(
        @Inject(LuciaFactory) private readonly lucia: ILucia,
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

        const token = generateToken();

        const session = await this.lucia.createSession(createdUser.id, {
            token
        });

        const sessionCookie = this.lucia.createSessionCookie(session.id);

        res.appendHeader('Set-Cookie', sessionCookie.serialize());
        res.appendHeader('csrf-token', token);

        return createdUser;
    }
}
