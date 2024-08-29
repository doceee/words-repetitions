import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { type Request } from 'express';

@Injectable()
export class MeService {
    constructor(private readonly prisma: PrismaService) {}

    async handle(req: Request) {
        const user = this.prisma.user.findUnique({
            where: { id: req.user.id }
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
