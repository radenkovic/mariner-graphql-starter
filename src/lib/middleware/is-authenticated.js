import { skip } from 'graphql-resolvers';
import { AuthenticationError } from 'apollo-server-express';

export default (root, args, { user }) =>
  user ? skip : new AuthenticationError('Not authenticated');
