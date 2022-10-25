import { gql } from 'apollo-server-core';

export const typeDefs = gql`
  type Student {
    id: String!
    name: String!
    startDate: Float!
    lessons: [Lesson!]!
    hourBanks: [HourBank!]!
    studentPrices: [StudentPrice!]!
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
    duration: Float!
    paid: Boolean!
    summary: String
  }
  type HourBank {
    id: String!
    studentId: String!
    date: Float!
    hours: Float!
    hoursLeft: Float!
  }
  type StudentPrice {
    id: String!
    studentId: String!
    price: Float!
    date: Float!
  }
  type Query {
    students: [Student!]!
    lessons: [Lesson!]!
  }

  type Mutation {
    addStudent(name: String!, startDate: Float!, price: Float!): Student
    addLesson(
      studentId: String!
      date: Float!
      price: Float!
      duration: Float!
      summary: String
      paid: Boolean
    ): Lesson
    updateLesson(
      lessonId: String!
      studentId: String
      date: Float
      price: Float
      duration: Float
      summary: String
      paid: Boolean
    ): Lesson
    addHourBank(studentId: String!, hours: Float!, date: Float!): HourBank
  }
`;
