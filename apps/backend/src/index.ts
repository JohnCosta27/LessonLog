import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { PrismaClient } from ".prisma/client";
import { AddLessonInput, AddStudentInput } from "@lessonlog/graphql-types";

const app = express();
const prisma = new PrismaClient();

const typeDefs = gql`
  type Student {
    id: String!
    name: String!
    startDate: Float!
    lessons: [Lesson!]!
  }
  type Lesson {
    id: String!
    studentId: String!
    date: Float!
    price: Float!
    summary: String
  }
  type Query {
    students: [Student!]!
  }

  type Mutation {
    addStudent(name: String!, startDate: Float!): Student
    addLesson(
      studentId: String!
      date: Float!
      price: Float!
      summary: String
    ): Lesson
  }
`;

interface LessonsQuery {
  id: string;
  studentId: string;
  date: Date;
  price: number;
  summary: string | null;
}

interface StudentsQuery {
  id: string;
  name: string;
  startDate: number;
  lessons: Array<LessonsQuery>;
}

const resolvers = {
  Query: {
    async students(): Promise<Array<StudentsQuery>> {
      try {
        const students = await prisma.students.findMany({
          include: {
            lessons: true,
          },
        });
        const returnStudents = students.map((s) => ({
          id: s.id,
          name: s.name,
          startDate: s.startDate.getTime(),
          lessons: s.lessons.map(l => ({
            id: l.id,
            studentId: l.studentId,
            date: l.date,
            price: l.price,
            summary: l.summary
          })),
        }));

        return returnStudents;
      } catch (e) {
        console.log(e);
        return [];
      }
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
    async addLesson(
      _: unknown,
      { studentId, date, price, summary }: AddLessonInput
    ): Promise<
      | {
          id: string;
          studentId: string;
          date: Date;
          price: number;
          summary?: string;
        }
      | undefined
    > {
      try {
        const newLesson = await prisma.lessons.create({
          data: {
            studentId: studentId,
            date: new Date(date),
            price: price,
            summary: summary,
          },
        });
        return {
          id: newLesson.id,
          studentId: newLesson.studentId,
          date: newLesson.date,
          price: newLesson.price,
          summary: newLesson.summary!,
        };
      } catch (e) {
        console.log(e);
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
