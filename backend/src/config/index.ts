import * as dotenv from 'dotenv';

dotenv.config();

const env = (val: string, defaultValue = ''): string =>
    process.env[val] || defaultValue;

const PROD_ENVIRONMENTS = ['prod', 'production'];
const currentEnvironment = process.env.NODE_ENV;

const nodeEnvironment = env('NODE_ENV', 'dev');

export const config = () => ({
    app: {
        port: +env('APP_PORT', '3000'),
        frontendUrl: env('APP_FRONTEND_URL', 'http://localhost:8080'),
        appUrl: env('APP_URL', 'http://localhost:3000'),
        isProduction: PROD_ENVIRONMENTS.includes(currentEnvironment)
    },
    database: {
        url: `postgres://${env('DB_USER', 'user')}:${env('DB_PASSWORD')}@${env(
            'DB_HOST',
            'localhost'
        )}:${+env('DB_PORT', '5432')}/${env('DB_NAME', 'database')}?${
            nodeEnvironment === 'prod' ? 'sslmode=require' : ''
        }`,
        type: 'postgres',
        host: env('DB_HOST', 'localhost'),
        port: +env('DB_PORT', '5432'),
        username: env('DB_USER', 'postgres'),
        password: env('DB_PASSWORD'),
        database: env('DB_NAME', 'postgres'),
        synchronize: nodeEnvironment === 'test'
    },
    redisSession: {
        host: env('REDIS_SESSION_HOST', 'localhost'),
        port: +env('REDIS_SESSION_PORT', '6379'),
        password: env('REDIS_SESSION_PASS')
    },
    session: {
        secret: env('SESSION_SECRET')
    }
});
