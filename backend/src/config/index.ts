const env = (val: string, defaultValue = ''): string =>
    process.env[val] || defaultValue;

const mode = process.env.NODE_ENV ?? 'dev';
const isProduction = ['prod', 'production'].includes(mode);
const isDevelopment = ['dev', 'development'].includes(mode);

export const config = () => ({
    app: {
        port: +env('APP_PORT', '3000'),
        frontendUrl: env('APP_FRONTEND_URL', 'http://localhost:8080'),
        appUrl: env('APP_URL', 'http://localhost:3000'),
        isProduction,
        isDevelopment
    },
    database: {
        url: `postgres://${env('DB_USER', 'user')}:${env('DB_PASSWORD')}@${env(
            'DB_HOST',
            'localhost'
        )}:${+env('DB_PORT', '5432')}/${env('DB_NAME', 'database')}?${
            isProduction ? 'sslmode=require' : ''
        }`,
        type: 'postgres',
        host: env('DB_HOST', 'localhost'),
        port: +env('DB_PORT', '5432'),
        username: env('DB_USER', 'postgres'),
        password: env('DB_PASSWORD'),
        database: env('DB_NAME', 'postgres'),
        synchronize: mode === 'test'
    },
    redisSession: {
        host: env('REDIS_SESSION_HOST', 'localhost'),
        port: +env('REDIS_SESSION_PORT', '6379'),
        password: env('REDIS_SESSION_PASS')
    },
    session: {
        secret: env('SESSION_SECRET')
    },
    translateApp: {
        host: env('TRANSLATE_APP_HOST', 'localhost'),
        port: +env('TRANSLATE_APP_PORT', '5000'),
        url: env('TRANSLATE_APP_URL', 'http://localhost:5000')
    }
});
