import { Authenticate } from 'node-mariner'; // eslint-disable-line

export default new Authenticate({
  secret: 'DEAD_SIMPLE_KEY',
  authorizationFn: ({ login, password }) => {
    if (login === 'dan' && password === '123456') {
      return {
        id: 1,
        name: 'Dan',
        email: 'dan@radenkovic.org'
      };
    }
    throw new Error('Login failed');
  }
});
