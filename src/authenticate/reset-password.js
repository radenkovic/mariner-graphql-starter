import { ApolloError } from 'apollo-server-express';
import User from '@/lib/services/user';
import login from './login';

const ResetPassword = `
  extend type Mutation {
    reset_password(token: String!, password: String!): Login!
  }
`;

export const resolver = async (root, args, ctx) => {
  try {
    const { token, password } = args;
    const user = await User.service('findOne', { password_reset_token: token });
    await User.service('update', {
      id: user.id,
      password,
      password_reset_token: null
    });
    return login(ctx.res, user);
  } catch (e) {
    throw new ApolloError('invalid or expired token', 'not-found');
  }
};

export default [ResetPassword];
