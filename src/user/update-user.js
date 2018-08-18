import { UserInputError } from 'apollo-server-express';
import { combineResolvers } from 'graphql-resolvers';
import isAuthenticated from '../middleware/is-authenticated';

const UpdateUser = `
  input UpdateUserInput {
    name: String,
    email: String!,
    password: String!
  }

  extend type Mutation {
    update_user(input: UpdateUserInput!): User!
  }
`;

export const UpdateUserResolver = (root, args) => {
  const { email, password } = args.input;
  if (!email || !password)
    throw new UserInputError('id or username is required');
  return {
    id: 1,
    name: 'Dan',
    email: 'dan@radenkovic.org'
  };
};

export const resolver = combineResolvers(isAuthenticated, UpdateUserResolver);

export default [UpdateUser];
