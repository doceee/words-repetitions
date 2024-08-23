import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Query,
    UseGuards
} from '@nestjs/common';
import { LoggedUserGuard } from '../middlewares/LoggedUserGuard';
import { StoreService } from '../services/user-activities/StoreService';
import { IndexService } from '../services/user-activities/IndexService';
import { GetUser } from '../decorators/GetUser.decorator';
import { CreateDto } from '../dto/user/Create.dto';

@Controller('user-activities')
@UseGuards(LoggedUserGuard)
export class UserActivitiesController {
    constructor(
        private storeService: StoreService,
        private indexService: IndexService
    ) {}

    @Get()
    getActivities(@GetUser('id') userId: string, @Query('date') date: string) {
        return this.indexService.handle(userId, date);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    storeActivity(
        @GetUser('id') userId: string,
        @Body()
        dto: CreateDto
    ) {
        return this.storeService.handle(dto, userId);
    }
}
