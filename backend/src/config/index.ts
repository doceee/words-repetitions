const env = (val: string, defaultValue = ''): string =>
    process.env[val] || defaultValue;

const mode = process.env.NODE_ENV ?? 'dev';
const isProduction = ['prod', 'production'].includes(mode);
const isDevelopment = ['dev', 'development'].includes(mode);

export const config = () => ({
    app: {
        port: +env('API_PORT', '3000'),
        frontendUrl: env('FRONTEND_URL', 'http://localhost:8080'),
        appUrl: env('API_URL', 'http://localhost:3000'),
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
        password: env('REDIS_SESSION_PASS'),
        user: env('REDIS_SESSION_USER', 'default')
    },
    session: {
        secret: env('SESSION_SECRET')
    },
    translateApp: {
        host: env('TRANSLATE_APP_HOST', 'localhost'),
        port: +env('TRANSLATE_APP_PORT', '5000')
    }
});
