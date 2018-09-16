import debug from 'debug';

export const log = debug('log:info');
export const warn = debug('log:warn');
export const error = debug('log:error');

export default debug(log);
