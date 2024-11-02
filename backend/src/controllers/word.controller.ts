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
    UseInterceptors,
    Delete,
    Query
} from '@nestjs/common';
import { LoggedUserGuard } from '../middlewares/LoggedUserGuard';
import { GoogleSearchWordService } from '../services/words/GoogleSearchWordService';
import { GetUser } from '../decorators/GetUser.decorator';
import { IndexService } from '../services/words/IndexService';
import { CreateEditDto } from '../dto/word/CreateEdit.dto';
import { RemoveService } from '../services/words/RemoveService';
import { AssignService } from '../services/words/AssignService';
import { GetUserWordsService } from '../services/words/GetUserWords';

@Controller('words')
@UseGuards(LoggedUserGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class WordsController {
    constructor(
        private indexService: IndexService,
        private removeService: RemoveService,
        private assignService: AssignService,
        private getUserWordsService: GetUserWordsService,
        private googleSearchWordService: GoogleSearchWordService
    ) {}

    @Get('')
    getWords(@Query('limit') limit = 10, @Query('level') level = '') {
        return this.indexService.handle(limit, level);
    }

    @Get('user/:id')
    getUserWords(@Param('id') userId: string) {
        return this.getUserWordsService.handle(userId);
    }

    @Get('search/:text')
    searchWord(@GetUser('id') userId: string, @Param('text') text: string) {
        return this.googleSearchWordService.handle(text, userId);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    assignWord(
        @GetUser('id') userId: string,
        @Body()
        dto: CreateEditDto
    ) {
        return this.assignService.handle(dto, userId);
    }

    @Put(':id')
    editWord(
        @Body()
        dto: CreateEditDto,
        @Param('id') wordId: string,
        @GetUser('id') userId: string
    ) {
        return this.assignService.handle(dto, userId, wordId);
    }

    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    removeWordById(@GetUser('id') userId: string, @Param('id') wordId: string) {
        return this.removeService.handle(wordId, userId);
    }
}
