import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

const typeDefs = gql`
  type Student {
    name: String!
  }
  type Query {
    students: [Student]
  }
`;

const resolvers = {
  Query: {
    students: async () => {
      const students = await prisma.students.findMany();
      const returnStudents = students.map((s) => ({ name: s.name }));

      return returnStudents;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.start().then(() => {
  server.applyMiddleware({ app, path: "/", cors: true });
});

app.listen(3000, () => {
  console.log("Server started");
});
