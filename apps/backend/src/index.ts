import express from "express";
import { ApolloServer, gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    cats: String
  }
`;

const resolvers = {
  Query: {
    cats: () => "hello",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

server.start().then(() => {
    server.applyMiddleware({app, path: '/', cors: true});
});

app.listen(3000, () => {
  console.log("Server started");
});
