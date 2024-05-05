const PROD_ENVIRONMENTS = ['prod', 'production'];
const currentEnvironment = process.env.NODE_ENV;

export default () => ({
    isProduction: PROD_ENVIRONMENTS.includes(currentEnvironment),
    appUrl: process.env.APP_URL,
    appPort: process.env.APP_PORT,
    databaseUrl: process.env.POSTGRES_URL,
    frontendUrl: process.env.FRONTEND_URL,
    cmsUrl: process.env.CMS_URL,
    clientUrl: process.env.CLIENT_URL,
    sessionSecret: process.env.SESSION_SECRET,
    redisSession: {
        port: process.env.REDIS_SESSION_PORT,
        host: process.env.REDIS_SESSION_HOST,
        user: process.env.REDIS_SESSION_USER
    }
});
