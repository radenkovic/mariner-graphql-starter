import { makeExecutableSchema } from 'graphql-tools';
import Authenticate from './authenticate';

import User from './user';

const SchemaDefinition = `
  type Query
  type Mutation
  scalar DateTime
  schema {
    query: Query
    mutation: Mutation
  }
`;

// Schema Stitching
export default makeExecutableSchema({
  typeDefs: [SchemaDefinition, ...Authenticate.typeDefs, ...User.typeDefs],
  resolvers: {
    BaseUser: User.BaseUser,
    Query: {
      ...Authenticate.queries,
      ...User.queries
    },
    Mutation: {
      ...Authenticate.mutations,
      ...User.mutations
    }
  }
});
