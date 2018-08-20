import { Authenticate, verifyPassword } from 'node-mariner';
import { AuthenticationError } from 'apollo-server-express';
import User from '@/user/service';

export default new Authenticate({
  secret: process.env.JWT_SECRET_KEY,
  authorizationFn: async ({ login, password }) => {
    try {
      // Find User using email or username
      const user = await User.service('findOne', {
        $or: { email: login, username: login }
      });
      // Verify password
      await verifyPassword({
        enteredPassword: password,
        password: user.password
      });
      delete user.password;
      return user;
    } catch (e) {
      throw new AuthenticationError(e.message, e.code);
    }
  }
});
