import {
    Index,
    Entity,
    Column,
    Unique,
    BeforeInsert,
    BeforeUpdate,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    BaseEntity
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Word } from './Word';

@Unique(['id', 'email'])
@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index({ unique: true })
    @Column()
    email: string;

    @Column({ select: false })
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({
        default: null,
        nullable: true
    })
    deletedAt: Date;

    @ManyToMany(() => Word, word => word.users, {
        onDelete: 'CASCADE'
    })
    @JoinTable({
        name: 'user2word',
        joinColumn: {
            name: 'userId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'wordId',
            referencedColumnName: 'id'
        }
    })
    words: Word[];

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        if (this?.password) {
            this.password = bcrypt.hashSync(this.password, 12);
        }
    }
}
