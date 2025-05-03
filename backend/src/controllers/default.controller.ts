import { Controller, Get, Req } from '@nestjs/common';

@Controller('')
export class DefaultController {
    @Get('/')
    getDefault(@Req() req: Request) {
        return { time: new Date().toISOString(), url: req.url };
    }
}
