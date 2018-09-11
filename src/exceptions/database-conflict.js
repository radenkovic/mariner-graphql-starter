import { ApolloError } from 'apollo-server-express';

export default (data, message = 'Conflict during database insert') => {
  throw new ApolloError(message, 'conflict', data);
};
