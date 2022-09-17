import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { PrismaClient } from ".prisma/client";
import { AddStudentInput } from "@lessonlog/graphql-types";

const app = express();
const prisma = new PrismaClient();

const typeDefs = gql`
  type Student {
    name: String!
    startDate: Float!
  }
  type Query {
    students: [Student]
  }

  type Mutation {
    addStudent(name: String!, startDate: Float!): Student
  }
`;

const resolvers = {
  Query: {
    async students(): Promise<{ name: string; startDate: number }[]> {
      const students = await prisma.students.findMany();
      const returnStudents = students.map((s) => ({
        name: s.name,
        startDate: s.startDate.getTime(),
      }));

      return returnStudents;
    },
  },
  Mutation: {
    async addStudent(
      _: unknown,
      { name, startDate }: AddStudentInput
    ): Promise<{ name: string; startDate: Date } | undefined> {
      try {
        const newStudent = await prisma.students.create({
          data: {
            name: name,
            startDate: new Date(startDate),
          },
        });
        return newStudent;
      } catch (e) {
        return undefined;
      }
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
