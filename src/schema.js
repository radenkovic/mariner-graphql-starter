import { makeExecutableSchema } from 'graphql-tools';
import UUID from 'graphql-tools-type-uuid';
import { GraphQLDateTime } from 'graphql-iso-date';

import Authenticate from './authenticate';

import User from './user';

const SchemaDefinition = `
  type Query
  type Mutation
  scalar DateTime
  scalar UUID

  schema {
    query: Query
    mutation: Mutation
  }
`;

// Schema Stitching
export default makeExecutableSchema({
  typeDefs: [SchemaDefinition, ...Authenticate.typeDefs, ...User.typeDefs],
  resolvers: {
    UUID,
    DateTime: GraphQLDateTime,
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
