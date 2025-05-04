import { Controller, Get, Req, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('')
export class DefaultController {
    @Get('/')
    getDefault(@Req() req: Request, @Res() res: Response) {
        res.cookie('token', '1234567890', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000
        });
        return { time: new Date().toISOString(), url: req.url };
    }
}
