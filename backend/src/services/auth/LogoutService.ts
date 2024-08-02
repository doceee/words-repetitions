import { Injectable } from '@nestjs/common';
import { Request } from '../../types/common';

@Injectable()
export class LogoutService {
    handle(req: Request): Promise<void> {
        return new Promise<void>(resolve =>
            req.session.destroy(error => {
                if (error) {
                    throw error;
                }

                resolve();
            })
        );
    }
}
