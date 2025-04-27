import {
    Get,
    UseGuards,
    Controller,
    UseInterceptors,
    ClassSerializerInterceptor
} from '@nestjs/common';
import { LoggedUserGuard } from '../middlewares/LoggedUserGuard';
import { IndexService } from '../services/word-lists/IndexService';

@Controller('word-lists')
@UseGuards(LoggedUserGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class WordListsController {
    constructor(private indexService: IndexService) {}

    @Get('')
    getWords() {
        return this.indexService.handle();
    }
}
