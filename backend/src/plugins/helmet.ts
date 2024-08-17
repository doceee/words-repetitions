import helmet from 'helmet';

import { NestExpressApplication } from '@nestjs/platform-express';

export const useHelmet = (app: NestExpressApplication) => {
    app.use(helmet());
};
