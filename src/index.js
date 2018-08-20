import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import schema from './schema';
import readJwt from './middleware/read-jwt';

require('dotenv').config();

const app = express();

app.use(cookieParser());
app.use(readJwt); // Reads JWT and adds it to req.user

const server = new ApolloServer({
  schema,
  context: ({ req, res }) => ({ req, res, user: req.user })
});

server.applyMiddleware({ app });

app.listen({ port: 3000 }, () =>
  console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`)
);
