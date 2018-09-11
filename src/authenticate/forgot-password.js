import { ApolloError } from 'apollo-server-express';
import User from '@/services/user';
import crypto from 'crypto';

const ForgotPassword = `
  extend type Mutation {
    # Login can be username or email
    forgot_password(login: String!): Boolean
  }
`;

export const resolver = async (root, args) => {
  try {
    const { login } = args;
    const user = await User.service('findOne', {
      $or: { email: login, username: login }
    });
    const token = crypto.randomBytes(32).toString('hex');
    const res = await User.service('update', {
      id: user.id,
      password_reset_token: token
    });
    console.log(`[forgot password] token for ${res.email}:`, token);
    return true;
  } catch (e) {
    throw new ApolloError(
      'User with provided login does not exist`  `',
      e.code
    );
  }
};

export default [ForgotPassword];
