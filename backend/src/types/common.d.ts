import { type FullModel } from './general';

declare global {
    declare namespace Express {
        interface Request {
            user?: FullModel<'User'>;
        }
    }
}
