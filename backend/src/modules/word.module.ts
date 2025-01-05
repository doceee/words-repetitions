import { Module } from '@nestjs/common';

import { AuthModule } from './auth.module';
import { MoveService } from '../services/words/MoveService';
import { IndexService } from '../services/words/IndexService';
import { AssignService } from '../services/words/AssignService';
import { RemoveService } from '../services/words/RemoveService';
import { WordsController } from '../controllers/word.controller';
import { LoggedUserGuard } from '../middlewares/LoggedUserGuard';
import { TranslateService } from '../services/words/TranslateService';
import { GetUserWordsService } from '../services/words/GetUserWords';

@Module({
    imports: [AuthModule],
    controllers: [WordsController],
    providers: [
        GetUserWordsService,
        AssignService,
        RemoveService,
        MoveService,
        IndexService,
        LoggedUserGuard,
        TranslateService
    ]
})
export class WordModule {}
