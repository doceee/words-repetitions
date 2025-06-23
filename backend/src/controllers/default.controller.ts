import { Controller, Get, Head, Req } from '@nestjs/common';

@Controller('')
export class DefaultController {
    @Head()
    headRoot() {
        return;
    }

    @Get('/')
    getDefault(@Req() req: Request) {
        return { time: new Date().toISOString(), url: req.url };
    }
}
