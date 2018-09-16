import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import schema from './schema';
import readJwt from '@/lib/middleware/read-jwt';

require('dotenv').config();

const app = express();

app.use(cookieParser());
app.use(readJwt); // Reads JWT and adds it to req.user

const server = new ApolloServer({
  schema,
  context: ({ req, res }) => ({ req, res, user: req.user }),
  formatError: err => {
    console.error(err);
    delete err.extensions.exception.stacktrace;
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
