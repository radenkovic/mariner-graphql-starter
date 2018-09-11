import { UserInputError, ApolloError } from 'apollo-server-express';
import User from '@/services/user';

const UserType = `
  type User implements BaseUser {
    id: UUID!
    name: String,
    email: String!,
    username: String!,
    created_at: DateTime!,
    updated_at: DateTime!
  }

  extend type Query {
    # Id or username is required
    user(id: UUID, username: String): User!
  }
`;

export const resolver = async (root, args) => {
  const { id, username } = args;
  if (!id && !username) throw new UserInputError('id or username is required');
  const query = id ? { id } : { username };
  try {
    return User.service('findOne', query);
  } catch (e) {
    throw new ApolloError(e.message, e.code);
  }
};

export default [UserType];
