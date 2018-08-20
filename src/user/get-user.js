import { UserInputError, ApolloError } from 'apollo-server-express';
import User from './service';

const UserType = `
  type User implements BaseUser {
    id: Int!
    name: String,
    email: String!,
    username: String,
    created_at: DateTime!,
    updated_at: DateTime!
  }

  extend type Query {
    # Id or username is required
    user(id: Int, username: String): User!
  }
`;

export const resolver = async (root, args) => {
  const { id, username } = args;
  if (!id && !username) throw new UserInputError('id or username is required');
  const query = id ? { id } : { username };
  try {
    const user = await User.service('findOne', query);
    return user;
  } catch (e) {
    throw new ApolloError(e.message, e.code);
  }
};

export default [UserType];
