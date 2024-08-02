import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Word } from '../entities/Word';
import { AbstractRepository } from './Abstract';

import { Repository } from 'typeorm';

@Injectable()
export class WordRepository extends AbstractRepository<Word> {
    constructor(
        @InjectRepository(Word)
        public repository: Repository<Word>
    ) {
        super();
    }
}
