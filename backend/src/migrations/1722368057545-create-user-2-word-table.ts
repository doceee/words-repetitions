import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey
} from 'typeorm';

export class CreateUser2WordTable1722368057545 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createDatabase(process.env.DB_NAME, true);

        await queryRunner.createTable(
            new Table({
                name: 'user2word',
                columns: [
                    {
                        name: 'wordId',
                        type: 'uuid'
                    },
                    {
                        name: 'userId',
                        type: 'uuid'
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ],
                foreignKeys: [
                    new TableForeignKey({
                        columnNames: ['wordId'],
                        referencedTableName: 'words',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE'
                    }),
                    new TableForeignKey({
                        columnNames: ['userId'],
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE'
                    })
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user2word');
    }
}
