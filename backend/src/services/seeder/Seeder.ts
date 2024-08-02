import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/User';
import { WordRepository } from '../../repositories/Word';
import { User } from '../../entities/User';

@Injectable()
export class Seeder {
    constructor(
        private userRepository: UserRepository,
        private wordRepository: WordRepository
    ) {}

    async handle() {
        try {
            console.log('Started seeding users...');
            const users = await this.seedUsers();
            console.log('Successfuly completed seeding users!');

            console.log('Started seeding words...');
            await this.seedWords(users);
            console.log('Successfuly completed seeding words!');
        } catch (error) {
            console.error('Failed seeding db...');
        }
    }

    async seedWords(users: User[]) {
        const words = [
            { word: 'add', translation: 'dodawać' },
            { word: 'work', translation: 'praca' },
            { word: 'word', translation: 'słowo' },
            { word: 'way', translation: 'droga' },
            { word: 'world', translation: 'świat' }
        ];

        const promise = words.map(async ({ word, translation }) =>
            this.wordRepository.create({ word, translation, users })
        );

        await Promise.all(promise);
    }

    async seedUsers() {
        const users = [
            { email: 'user@gmail.com', password: 'test1234' },
            { email: 'user2@gmail.com', password: 'test1234' }
        ];

        const promise = users.map(async ({ email, password }) =>
            this.userRepository.create({
                email,
                password
            })
        );

        await Promise.all(promise);

        return this.userRepository.findAll();
    }
}
