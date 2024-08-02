import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    UseGuards,
    ClassSerializerInterceptor,
    UseInterceptors
} from '@nestjs/common';
import { LoggedUserGuard } from '../middlewares/LoggedUserGuard';
import { GoogleSearchWordService } from '../services/words/GoogleSearchWordService';
import { GetUser } from '../decorators/GetUser.decorator';
import { IndexService } from '../services/words/IndexService';
import { CreateEditDto } from '../dto/word/CreateEdit.dto';
import { RemoveService } from '../services/words/RemoveService';
import { AssignService } from '../services/words/AssignService';
import { EditService } from '../services/words/EditService';

import type { User } from '../entities/User';

@Controller('words')
@UseGuards(LoggedUserGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class WordsController {
    constructor(
        private indexService: IndexService,
        private removeService: RemoveService,
        private editService: EditService,
        private assignService: AssignService,
        private googleSearchWordService: GoogleSearchWordService
    ) {}

    @Get()
    getWords(@GetUser('id') userId: string) {
        return this.indexService.handle(userId);
    }

    @Get('search/:text')
    searchWord(@GetUser('id') userId: string, @Param('text') text: string) {
        return this.googleSearchWordService.handle(text, userId);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    assignWord(
        @GetUser() user: User,
        @Body()
        dto: CreateEditDto
    ) {
        return this.assignService.handle(dto, user);
    }

    @Put()
    editWord(
        @GetUser() user: User,
        @Body()
        dto: CreateEditDto
    ) {
        return this.editService.handle(dto, user);
    }

    @HttpCode(HttpStatus.OK)
    @Post(':id')
    removeWordById(@GetUser('id') userId: string, @Param('id') wordId: string) {
        return this.removeService.handle(wordId, userId);
    }
}
