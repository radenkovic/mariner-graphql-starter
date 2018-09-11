import { ApolloError } from 'apollo-server-express';
import login from '@/authenticate/login';
import DatabaseConflictException from '@/lib/exceptions/database-conflict';
import User from '@/lib/services/user';

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
    // Conflict
    if (e.code === '23505') {
      if (e.constraint === 'user_email_key')
        throw new DatabaseConflictException({
          email: ['email already exists']
        });
      if (e.constraint === 'user_username_key')
        throw new DatabaseConflictException({
          username: ['username already exists']
        });
    }
    // Fallback
    throw new ApolloError(e.message, e.code, e.data);
  }
};

export default [CreateUser];
