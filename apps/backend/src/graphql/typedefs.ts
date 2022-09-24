import { gql } from 'apollo-server-core';

export const typeDefs = gql`
  type Student {
    id: String!
    name: String!
    startDate: Float!
    lessons: [Lesson!]!
  }
  type LessonStudent {
    name: String!
  }
  type Lesson {
    id: String!
    studentId: String!
    student: LessonStudent
    date: Float!
    price: Float!
    paid: Boolean!
    summary: String
  }
  type Query {
    students: [Student!]!
    lessons: [Lesson!]!
  }

  type Mutation {
    addStudent(name: String!, startDate: Float!): Student
    addLesson(
      studentId: String!
      date: Float!
      price: Float!
      summary: String
      paid: Boolean
    ): Lesson
    updateLesson(
      lessonId: String!
      studentId: String
      date: Float
      price: Float
      summary: String
      paid: Boolean
    ): Lesson
  }
`;
