import { Module } from '@nestjs/common';

import { GoogleSearchWordService } from '../services/words/GoogleSearchWordService';
import { WordsController } from '../controllers/word.controller';
import { AssignService } from '../services/words/AssignService';
import { RemoveService } from '../services/words/RemoveService';
import { IndexService } from '../services/words/IndexService';
import { LoggedUserGuard } from '../middlewares/LoggedUserGuard';
import { PrismaModule } from './prisma.module';
import { AuthModule } from './auth.module';

@Module({
    imports: [PrismaModule, AuthModule],
    controllers: [WordsController],
    providers: [
        AssignService,
        RemoveService,
        IndexService,
        LoggedUserGuard,
        GoogleSearchWordService
    ]
})
export class WordModule {}
