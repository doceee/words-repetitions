import { Inject, Injectable } from '@nestjs/common';
import { type Request, type Response } from 'express';
import { ILucia } from '../../plugins/lucia';
import { LuciaFactory } from '../../modules/lucia.module';

@Injectable()
export class LogoutService {
    constructor(@Inject(LuciaFactory) private readonly lucia: ILucia) {}
    async handle(req: Request, res: Response): Promise<void> {
        const sessionId = this.lucia.readSessionCookie(
            req.headers.cookie ?? ''
        );

        await this.lucia.invalidateSession(sessionId);

        const sessionCookie = this.lucia.createBlankSessionCookie();

        res.setHeader('Set-Cookie', sessionCookie.serialize());
    }
}
