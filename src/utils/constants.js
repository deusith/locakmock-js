import path from 'path';

export const ENDPOINT_DIRECTORY = path.join(process.cwd(), `/endpoints`);
export const STATUS_LIST = [200, 400, 401, 402, 403, 404, 500, 503];