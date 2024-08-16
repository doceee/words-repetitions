import { Module } from '@nestjs/common';

import { WordsController } from '../controllers/word.controller';
import { AssignService } from '../services/words/AssignService';
import { RemoveService } from '../services/words/RemoveService';
import { EditService } from '../services/words/EditService';
import { IndexService } from '../services/words/IndexService';
import { AuthModule } from './auth.module';
import { LoggedUserGuard } from '../middlewares/LoggedUserGuard';
import { GoogleSearchWordService } from '../services/words/GoogleSearchWordService';
import { PrismaModule } from './prisma.module';

@Module({
    imports: [PrismaModule, AuthModule],
    controllers: [WordsController],
    providers: [
        AssignService,
        RemoveService,
        EditService,
        IndexService,
        LoggedUserGuard,
        GoogleSearchWordService
    ]
})
export class WordModule {}
