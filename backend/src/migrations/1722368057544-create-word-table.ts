import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateWordTable1722368057544 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createDatabase(process.env.DB_NAME, true);

        await queryRunner.createTable(
            new Table({
                name: 'words',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid'
                    },
                    {
                        name: 'word',
                        type: 'varchar'
                    },
                    {
                        name: 'translation',
                        type: 'varchar'
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('words');
    }
}
