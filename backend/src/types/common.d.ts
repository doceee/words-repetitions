import { Request as ExpressRequest } from 'express';
import { Session } from 'express-session';
import { type FullModel } from './general';

interface Request extends ExpressRequest {
    user?: FullModel<'User'>;
    session: Session & {
        user?: string;
    };
}
