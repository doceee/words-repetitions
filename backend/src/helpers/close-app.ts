import { NestExpressApplication } from '@nestjs/platform-express';
import * as closeWithGrace from 'close-with-grace';

export const closeAppWithGrace = (app: NestExpressApplication) => {
    closeWithGrace(async ({ signal, err }) => {
        if (err) {
            console.error({ err }, 'server closing with error');
        }

        if (signal) {
            console.info(`${signal} received, server closing`);
        }

        await app.close();
    });
};
