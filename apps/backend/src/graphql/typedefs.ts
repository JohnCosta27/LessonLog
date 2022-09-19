import { gql } from "apollo-server-core";

export const typeDefs = gql`
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
