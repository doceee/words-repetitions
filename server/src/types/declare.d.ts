import { User } from '@prisma/client';

declare module 'express-session' {
  interface SessionData {
    user?: string;
  }
}

declare module 'http' {
  interface IncomingHttpHeaders {
    uid?: string;
  }
}

declare module 'express' {
  interface Request {
    user?: User;
  }
}
