import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { LoggedInGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserRepository } from './user.repository';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
    constructor(private readonly userRepository: UserRepository) {}

    @Get('me')
    getMe(@GetUser() user: User) {
        return user;
    }

    @UseGuards(LoggedInGuard)
    @Patch()
    editUser(@GetUser('id') userId: string, @Body() dto: EditUserDto) {
        return this.userRepository.editUser(userId, dto);
    }
}
