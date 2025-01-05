import { Module } from '@nestjs/common';

import { WordListsController } from '../controllers/word-list.controller';
import { IndexService } from '../services/word-lists/IndexService';
import { AuthModule } from './auth.module';

@Module({
    imports: [AuthModule],
    controllers: [WordListsController],
    providers: [IndexService]
})
export class WordListModule {}
