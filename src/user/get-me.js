import { combineResolvers } from 'graphql-resolvers';
import isAuthenticated from '../middleware/is-authenticated';

const Me = `
   type Me implements BaseUser  {
     id: Int!
     name: String,
     email: String!,
     username: String!,
     created_at: DateTime!,
     updated_at: DateTime!
  }

  extend type Query {
    me: Me!
  }
`;

const MeResolver = (root, args, ctx) => ({
  ...ctx.user
});

export const resolver = combineResolvers(isAuthenticated, MeResolver);
export default [Me];
