import { Module } from '@nestjs/common';
import { WordController } from './word.controller';
import { WordRepository } from './word.repository';
import { WordService } from './word.service';
import { LoggedInGuard } from '../auth/guard';
import { UserRepository } from '../user/user.repository';

@Module({
    controllers: [WordController],
    providers: [WordRepository, WordService, LoggedInGuard, UserRepository]
})
export class WordModule {}
