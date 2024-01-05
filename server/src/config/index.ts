const TEST_ENVIRONMENTS = ['test'];
const DEV_ENVIRONMENTS = ['dev', 'development'];
const PROD_ENVIRONMENTS = ['prod', 'production'];
const currentEnvironment = process.env.NODE_ENV;

export default () => ({
  isDev: DEV_ENVIRONMENTS.includes(currentEnvironment),
  isTest: TEST_ENVIRONMENTS.includes(currentEnvironment),
  isProduction: PROD_ENVIRONMENTS.includes(currentEnvironment),
  appUrl: process.env.APP_URL,
  databaseUrl: process.env.DATABASE_URL,
  frontendUrl: process.env.FRONTEND_URL,
  redisUrl: process.env.REDIS_URL,
  clientUrl: process.env.CLIENT_URL,
  sessionSecret: process.env.SESSION_SECRET,
  redisSession: {
    url: `redis://${process.env.REDIS_SESSION_USER}:${process.env.REDIS_SESSION_PASS}@${process.env.REDIS_SESSION_HOST}:${process.env.REDIS_SESSION_PORT}`,
    port: process.env.REDIS_SESSION_PORT,
    host: process.env.REDIS_SESSION_HOST,
    user: process.env.REDIS_SESSION_USER,
  },
});
