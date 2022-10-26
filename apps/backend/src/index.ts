import express, { NextFunction, Request, Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './graphql';
// @ts-ignore
import cors from 'cors';

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(cors());

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  if (req.headers['verycoolheadernothingtoseehere'] === process.env.PASSWORD) {
    next();
  } else {
    res.json({ error: 'Not authorised' });
  }
});

server.start().then(() => {
  server.applyMiddleware({ app, path: '/', cors: true });
});

app.listen(3030, () => {
  console.log('Server started');
});
