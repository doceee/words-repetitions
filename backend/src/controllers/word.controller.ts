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
    Query,
    ParseUUIDPipe
} from '@nestjs/common';
import { MoveDto } from '../dto/word/Move.dto';
import { LoggedUserGuard } from '../middlewares/LoggedUserGuard';
import { TranslateService } from '../services/words/TranslateService';
import { GetUser } from '../decorators/GetUser.decorator';
import { IndexService } from '../services/words/IndexService';
import { CreateEditDto } from '../dto/word/CreateEdit.dto';
import { RemoveService } from '../services/words/RemoveService';
import { AssignService } from '../services/words/AssignService';
import { MoveService } from '../services/words/MoveService';
import { GetUserWordsService } from '../services/words/GetUserWords';
import { WordListType } from '../config/constants';

@Controller('words')
@UseGuards(LoggedUserGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class WordsController {
    constructor(
        private moveService: MoveService,
        private indexService: IndexService,
        private removeService: RemoveService,
        private assignService: AssignService,
        private getUserWordsService: GetUserWordsService,
        private translateService: TranslateService
    ) {}

    @Get('')
    getWords(@Query('limit') limit = 10, @Query('level') level = '') {
        return this.indexService.handle(limit, level);
    }

    @Get('user/:id')
    getUserWords(
        @Param('id', new ParseUUIDPipe({ version: '4' })) userId: string,
        @Query('wordList') wordList = `${WordListType.current}`
    ) {
        return this.getUserWordsService.handle(userId, wordList);
    }

    @Get('search/:text')
    searchWord(@GetUser('id') userId: string, @Param('text') text: string) {
        return this.translateService.handle(text, userId);
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

    @Post('move')
    moveWord(
        @GetUser('id') userId: string,
        @Body()
        dto: MoveDto
    ) {
        return this.moveService.handle(dto, userId);
    }

    @Put(':id')
    editWord(
        @Body()
        dto: CreateEditDto,
        @Param('id', new ParseUUIDPipe({ version: '4' })) wordId: string,
        @GetUser('id') userId: string
    ) {
        return this.assignService.handle(dto, userId, wordId);
    }

    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    removeWordById(
        @GetUser('id') userId: string,
        @Param('id', new ParseUUIDPipe({ version: '4' })) wordId: string
    ) {
        return this.removeService.handle(wordId, userId);
    }
}
