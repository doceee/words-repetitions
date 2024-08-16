import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Request } from '../../types/common';

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
