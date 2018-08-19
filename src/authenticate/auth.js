import { Authenticate, verifyPassword } from 'node-mariner'; // eslint-disable-line
import { AuthenticationError } from 'apollo-server-express';
import User from '@/user/service';

export default new Authenticate({
  secret: 'DEAD_SIMPLE_KEY',
  authorizationFn: async ({ login, password }) => {
    try {
      const user = await User.service('findOne', {
        $or: { email: login, username: login }
      });
      // Verify password
      await verifyPassword({
        enteredPassword: password,
        password: user.password
      });
      return user;
    } catch (e) {
      throw new AuthenticationError(e.message, e.code);
    }
  }
});
