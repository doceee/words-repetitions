import { Module } from '@nestjs/common';

import { TranslateService } from '../services/words/TranslateService';
import { WordsController } from '../controllers/word.controller';
import { AssignService } from '../services/words/AssignService';
import { RemoveService } from '../services/words/RemoveService';
import { IndexService } from '../services/words/IndexService';
import { LoggedUserGuard } from '../middlewares/LoggedUserGuard';
import { AuthModule } from './auth.module';
import { GetUserWordsService } from '../services/words/GetUserWords';

@Module({
    imports: [AuthModule],
    controllers: [WordsController],
    providers: [
        GetUserWordsService,
        AssignService,
        RemoveService,
        IndexService,
        LoggedUserGuard,
        TranslateService
    ]
})
export class WordModule {}
