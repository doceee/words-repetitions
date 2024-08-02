import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WordsController } from '../controllers/word.controller';
import { AssignService } from '../services/words/AssignService';
import { RemoveService } from '../services/words/RemoveService';
import { EditService } from '../services/words/EditService';
import { IndexService } from '../services/words/IndexService';
import { Word } from '../entities/Word';
import { WordRepository } from '../repositories/Word';
import { AuthModule } from './auth.module';
import { LoggedUserGuard } from '../middlewares/LoggedUserGuard';
import { GoogleSearchWordService } from '../services/words/GoogleSearchWordService';

@Module({
    imports: [TypeOrmModule.forFeature([Word]), AuthModule],
    controllers: [WordsController],
    providers: [
        WordRepository,
        AssignService,
        RemoveService,
        EditService,
        IndexService,
        LoggedUserGuard,
        GoogleSearchWordService
    ],
    exports: [WordRepository]
})
export class WordModule {}
