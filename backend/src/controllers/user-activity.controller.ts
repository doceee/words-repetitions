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
import { GetWeeklyActivitiesService } from '../services/user-activities/GetWeeklyActivitiesService';
import { GetUser } from '../decorators/GetUser.decorator';
import { CreateDto } from '../dto/user-activity/Create.dto';

@Controller('user-activities')
@UseGuards(LoggedUserGuard)
export class UserActivitiesController {
    constructor(
        private storeService: StoreService,
        private getWeeklyActivitiesService: GetWeeklyActivitiesService
    ) {}

    @Get('weekly-activities')
    getWeeklyActivities(
        @GetUser('id') userId: string,
        @Query('date') date: string
    ) {
        return this.getWeeklyActivitiesService.handle(userId, date);
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
