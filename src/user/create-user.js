import { UserInputError, ApolloError } from 'apollo-server-express';
import { SaltHash } from 'node-mariner';
import User from './service';

const CreateUser = `
  input CreateUserInput {
    name: String,
    username: String,
    email: String!,
    password: String!
  }

  extend type Mutation {
    create_user(input: CreateUserInput!): User!
  }
`;

export const resolver = async (root, args) => {
  const { username, email, password } = args.input;
  if (!email || !password)
    throw new UserInputError('id or username is required');
  try {
    const passwordHash = await SaltHash(password);
    const user = await User.service('create', {
      email,
      username,
      password: passwordHash
    });
    return user;
  } catch (e) {
    if (e.code === '23505') {
      throw new ApolloError('Username already exists', 'conflict');
    }
    throw new ApolloError(e.message, e.code, e.data, e.data);
  }
};

export default [CreateUser];
