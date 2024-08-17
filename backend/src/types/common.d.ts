import { Request as ExpressRequest } from 'express';
import { type FullModel } from './general';

interface Request extends ExpressRequest {
    user?: FullModel<'User'>;
}
