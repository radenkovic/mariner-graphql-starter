import { UserInputError } from 'apollo-server-express';

const CreateUser = `
  input CreateUserInput {
    name: String,
    email: String!,
    password: String!
  }

  extend type Mutation {
    create_user(input: CreateUserInput!): User!
  }
`;

export const resolver = (root, args) => {
  const { email, password } = args.input;
  if (!email || !password)
    throw new UserInputError('id or username is required');
  return {
    id: 1,
    name: 'Dan',
    email: 'dan@radenkovic.org'
  };
};

export default [CreateUser];
