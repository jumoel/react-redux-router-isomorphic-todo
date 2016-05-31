import path from 'path';

export const ROOT_PATH = path.resolve(__dirname, '../');
export const PRODUCTION = process.env.NODE_ENV === 'production';

export const filterFalsy = (list) => list.filter(e => e);
