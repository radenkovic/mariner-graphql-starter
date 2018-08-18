import { UserInputError } from 'apollo-server-express';

const User = `
  type User implements BaseUser {
    id: Int!
    name: String,
    email: String!
  }

  extend type Query {
    # Id or username is required
    user(id: Int, username: String): User!
  }
`;

export const resolver = (root, args) => {
  const { id, username } = args;
  if (!id && !username) throw new UserInputError('id or username is required');
  return {
    id: 1,
    name: 'Dan',
    email: 'dan@radenkovic.org'
  };
};

export default [User];
