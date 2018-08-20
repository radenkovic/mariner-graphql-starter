import { AuthenticationError } from 'apollo-server-express';
import Auth from './auth';
import login from './login';
import ForgotPassword, { resolver as forgot_password } from './forgot-password';
import ResetPassword, { resolver as reset_password } from './reset-password';

const Authenticate = `
  type Login {
    accessToken: String!
    user: User!
  }

  extend type Mutation {
    authenticate(login: String!, password: String!): Login
  }
`;

export const authenticate = async (root, args, ctx) => {
  try {
    const user = await Auth.authenticate(args);
    return login(ctx.res, user);
  } catch (e) {
    throw new AuthenticationError('authentication failed');
  }
};

export default {
  typeDefs: [Authenticate, ...ForgotPassword, ...ResetPassword],
  queries: {},
  mutations: { authenticate, forgot_password, reset_password }
};
