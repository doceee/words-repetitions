import * as crypto from 'crypto';

export const generateToken = () => {
    const randomPart = crypto.randomBytes(32).toString('hex');
    const timestampPart = Date.now().toString(36);

    return `${randomPart}-${timestampPart}`;
};
