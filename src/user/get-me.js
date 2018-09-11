import { combineResolvers } from 'graphql-resolvers';
import isAuthenticated from '../middleware/is-authenticated';
import User from '@/services/user';

const Me = `
   type Me implements BaseUser  {
     id: UUID!
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

const MeResolver = (root, args, ctx) =>
  User.service('findOne', { id: ctx.user.id });

export const resolver = combineResolvers(isAuthenticated, MeResolver);
export default [Me];
