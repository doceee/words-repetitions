import { Module } from '@nestjs/common';
import { WordController } from './word.controller';
import { WordRepository } from './word.repository';
import { ReversoSearchWordService } from './reverso.search.word.service';
import { GoogleSearchWordService } from './google.search.word.service';
import { LoggedInGuard } from '../auth/guard';
import { UserRepository } from '../user/user.repository';

@Module({
    controllers: [WordController],
    providers: [
        WordRepository,
        ReversoSearchWordService,
        GoogleSearchWordService,
        LoggedInGuard,
        UserRepository
    ]
})
export class WordModule {}
