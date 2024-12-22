import { type User } from '@prisma/client';
import { Session } from 'express-session';

declare module 'express' {
    export interface Request {
        user?: User;
        session: Session & {
            user?: string;
            tokens?: string[];
        };
    }
}

declare module 'http' {
    interface IncomingHttpHeaders {
        'csrf-token'?: string;
    }
}
