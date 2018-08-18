import { AuthenticationError } from 'apollo-server-express';
import Auth from './auth';

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
    ctx.res.cookie('graphql-cookie', user.access_token, {
      maxAge: 1000 * 60 * 120,
      httpOnly: true
    });
    return {
      accessToken: user.access_token,
      user
    };
  } catch (e) {
    throw new AuthenticationError('authentication failed');
  }
};

export default {
  typeDefs: [Authenticate],
  queries: {},
  mutations: { authenticate }
};
