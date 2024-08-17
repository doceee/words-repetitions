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

@Controller('words')
@UseGuards(LoggedUserGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class WordsController {
    constructor(
        private indexService: IndexService,
        private removeService: RemoveService,
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
    @Post(':id')
    removeWordById(@GetUser('id') userId: string, @Param('id') wordId: string) {
        return this.removeService.handle(wordId, userId);
    }
}
