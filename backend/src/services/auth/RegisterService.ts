import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from '../../dto/auth/RegisterDto';
import { PrismaService } from '../prisma.service';
import { Request } from '../../types/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class RegisterService {
    constructor(private readonly prisma: PrismaService) {}

    async handle(data: RegisterDto, req: Request) {
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

        const userItem = await this.prisma.user.findUnique({
            where: { id: createdUser.id }
        });

        req.user = userItem;
        req.session.user = userItem.id;

        return userItem;
    }
}
