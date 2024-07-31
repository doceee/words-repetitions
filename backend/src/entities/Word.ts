import {
    Index,
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    ManyToMany,
    BaseEntity
} from 'typeorm';
import { User } from './User';

@Entity('words')
export class Word extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index()
    @Column()
    word: string;

    @Column()
    translation: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToMany(() => User, user => user.words, { onDelete: 'CASCADE' })
    users: User[];

    @UpdateDateColumn()
    updatedAt: Date;
}
