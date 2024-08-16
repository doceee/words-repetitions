import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Request } from '../../types/common';

@Injectable()
export class GetLoggedUserService {
    constructor(private readonly prisma: PrismaService) {}

    async handle(req: Request) {
        const { user: userId } = req.session || {};

        if (!userId) {
            return null;
        }

        return this.prisma.user.findUnique({
            where: { id: userId }
        });
    }
}
