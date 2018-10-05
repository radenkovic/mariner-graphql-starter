import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import schema from './schema';
import readJwt from '@/lib/middleware/read-jwt';
import { error } from '@/lib/logger';

require('dotenv').config();

const __DEV__ = process.env.NODE_ENV === 'development';
const app = express();

app.use(cookieParser());
app.use(readJwt); // Reads JWT and adds it to req.user

const server = new ApolloServer({
  schema,
  context: ({ req, res }) => ({ req, res, user: req.user }),
  formatError: err => {
    error(err, err.extensions);
    if (!__DEV__) delete err.extensions.exception.stacktrace;
    return {
      message: err.message,
      code: err.extensions.code.toLowerCase().replace(/_/g, '-'),
      data: err.extensions.exception
    };
  }
});

server.applyMiddleware({ app });

app.listen({ port: 3000 }, () =>
  console.log(
    `🚀  ${process.env.NODE_ENV} server ready at http://localhost:3000${
      server.graphqlPath
    }`
  )
);
