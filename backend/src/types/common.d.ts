import { type User } from '@prisma/client';
import { Session } from 'express-session';
import { CSRF_TOKEN_HEADER } from '../config/constants';

declare module 'express' {
    export interface Request {
        user?: User;
        session: SessionData;
    }
}

declare module 'http' {
    interface IncomingHttpHeaders {
        [CSRF_TOKEN_HEADER]?: string;
    }
}

export interface SessionData extends Session {
    user?: string;
    tokens?: string[];
}
