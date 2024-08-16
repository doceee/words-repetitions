import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Request } from '../../types/common';

@Injectable()
export class MeService {
    constructor(private readonly prisma: PrismaService) {}

    async handle(req: Request) {
        const id = req.session.user;

        if (!id) {
            throw new UnauthorizedException();
        }

        const user = this.prisma.user.findUnique({
            where: { id }
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
