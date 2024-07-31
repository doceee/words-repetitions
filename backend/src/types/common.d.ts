import { User } from '@/entities/User';
import { Request as ExpressRequest } from 'express';
import { Session } from 'express-session';

interface Request extends ExpressRequest {
    user?: User;
    session: Session & {
        user?: string;
    };
}
