import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';

import { EditUserDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async getByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email }
        });
    }

    async getById(id: string) {
        return this.prisma.user.findFirst({ where: { id } });
    }

    async create(data: { email: string; password: string }) {
        const hashedPassword = await argon.hash(data.password);

        const user = await this.prisma.user.create({
            data: {
                email: data.email,
                hash: hashedPassword
            }
        });

        delete user.hash;

        return user;
    }

    async editUser(userId: string, dto: EditUserDto) {
        const user = await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                ...dto
            }
        });

        delete user.hash;

        return user;
    }

    async getAllUsers(): Promise<User[]> {
        return this.prisma.user.findMany();
    }
}
