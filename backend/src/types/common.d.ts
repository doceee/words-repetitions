import { type User } from '@prisma/client';

declare global {
    declare namespace Express {
        interface Request {
            user?: User;
        }
    }
}
