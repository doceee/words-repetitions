import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    UseGuards,
    ClassSerializerInterceptor,
    UseInterceptors,
    Put
} from '@nestjs/common';
import { LoggedUserGuard } from '../middlewares/LoggedUserGuard';
import { GetUser } from '../decorators/GetUser.decorator';
import { PatchStatsDto } from '../dto/user/PatchStats.dto';
import { UpdateStatsService } from '../services/users/UpdateStatsService';

@Controller('users')
@UseGuards(LoggedUserGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
    constructor(private updateStatsService: UpdateStatsService) {}

    @HttpCode(HttpStatus.OK)
    @Put('stats')
    updateStat(
        @Body()
        dto: PatchStatsDto,
        @GetUser('id') userId: string
    ) {
        return this.updateStatsService.handle(userId, dto);
    }
}
