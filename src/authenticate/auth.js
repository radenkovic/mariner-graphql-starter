import { Authenticate, verifyPassword } from 'node-mariner';
import { AuthenticationError } from 'apollo-server-express';
import User from '@/lib/services/user';

if (!process.env.JWT_SECRET_KEY) {
  throw new Error(
    'JWT_SECRET_KEY not found in environment variables. Do you have .env file?'
  );
}

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
