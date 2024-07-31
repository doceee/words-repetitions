import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const env = (val: string, defaultValue = ''): string =>
    process.env[val] || defaultValue;

const dir = `${process.env.NODE_ENV === 'dev' ? 'src' : 'dist'}`;

export const dbdatasource: DataSourceOptions = {
    type: 'postgres',
    host: env('DB_HOST', 'localhost'),
    port: +env('DB_PORT', '5432'),
    username: env('DB_USER', 'postgres'),
    password: env('DB_PASSWORD'),
    database: env('DB_NAME', 'postgres'),
    synchronize: false,
    migrations: [`${dir}/migrations/*.{ts,js}`, `${dir}/seeders/*.{ts,js}`],
    entities: [`${dir}/entities/*.{ts,js}`]
};

const AppDataSouce = new DataSource(dbdatasource);

export default AppDataSouce;
