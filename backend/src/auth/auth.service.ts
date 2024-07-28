import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { RegisterDto, LoginDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UserRepository } from '../user/user.repository';
import { BadRequestException } from '../exceptions/bad.request.exception';

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository) {}

    public async login(dto: LoginDto) {
        try {
            const user = await this.userRepository.getByEmail(dto.email);

            if (!user) {
                throw new UnauthorizedException();
            }

            await this.verifyPassword(dto.password, user.hash);

            delete user.hash;

            return user;
        } catch (error) {
            console.error(error);

            throw new UnauthorizedException();
        }
    }

    async register(dto: RegisterDto) {
        try {
            const user = await this.userRepository.create(dto);

            delete user.hash;

            return user;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new BadRequestException([
                        {
                            property: 'email',
                            constraints: {
                                email: 'Użytkownik z podanymi danymi jest już zarejestrowany.'
                            }
                        }
                    ]);
                }
            }

            throw error;
        }
    }

    private async verifyPassword(
        plainTextPassword: string,
        hashedPassword: string
    ) {
        const isPasswordMatching = await argon.verify(
            hashedPassword,
            plainTextPassword
        );

        if (!isPasswordMatching) {
            throw new UnauthorizedException();
        }
    }
}
