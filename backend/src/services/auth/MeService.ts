import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Request } from 'express';

@Injectable()
export class MeService {
    constructor(private readonly prisma: PrismaService) {}

    async handle(req: Request) {
        if (!req.session || !req.session.user) {
            throw new UnauthorizedException();
        }

        const user = await this.prisma.user.findUnique({
            where: { id: req.session.user }
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
