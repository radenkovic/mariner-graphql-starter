import { ApolloError } from 'apollo-server-express';
import login from '@/authenticate/login';

import User from './service';

const CreateUser = `
  input CreateUserInput {
    name: String,
    email: String!,
    username: String!,
    password: String!
  }

  extend type Mutation {
    create_user(input: CreateUserInput!): Login!
  }
`;

export const resolver = async (root, args, ctx) => {
  try {
    const user = await User.service('create', args.input);
    return login(ctx.res, user);
  } catch (e) {
    if (e.code === '23505' && e.constraint === 'user_email_key') {
      throw new ApolloError('Email already exists', 'conflict');
    } else if (e.code === '23505' && e.constraint === 'user_username_key') {
      throw new ApolloError('Username already exists', 'conflict');
    }
    throw new ApolloError(e.message, e.code, e.data, e.data);
  }
};

export default [CreateUser];
