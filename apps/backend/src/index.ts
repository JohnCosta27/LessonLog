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

  type Mutation {
    addStudent(name: String!): Student
  }
`;

const resolvers = {
  Query: {
    async students(): Promise<{ name: string }[]> {
      const students = await prisma.students.findMany();
      const returnStudents = students.map((s) => ({ name: s.name }));

      return returnStudents;
    },
  },
  Mutation: {
    async addStudent(
      _: unknown,
      { name }: { name: string }
    ): Promise<{ name: string }> {
      console.log(name);
      const newStudent = await prisma.students.create({
        data: {
          name: name,
        },
      });
      return newStudent;
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

app.listen(3001, () => {
  console.log("Server started");
});
