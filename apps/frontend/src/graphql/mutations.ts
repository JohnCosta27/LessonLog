import { gql } from '@merged/solid-apollo';

export const studentMutation = gql`
  mutation addStudent($name: String!, $startDate: Float!, $price: Float!) {
    addStudent(name: $name, startDate: $startDate, price: $price) {
      name
      startDate
    }
  }
`;

export const lessonMutation = gql`
  mutation addLesson(
    $studentId: String!
    $date: Float!
    $price: Float!
    $duration: Float!
    $summary: String
  ) {
    addLesson(
      studentId: $studentId
      date: $date
      price: $price
      duration: $duration
      summary: $summary
    ) {
      id
      studentId
      date
      price
      duration
      summary
    }
  }
`;

export const hourBankMutation = gql`
  mutation addHourBank($studentId: String!, $date: Float!, $hours: Float!) {
    addHourBank(studentId: $studentId, date: $date, hours: $hours) {
      studentId
      date
      hours
    }
  }
`;

export const lessonUpdateMutation = gql`
  mutation updateLesson(
    $lessonId: String!
    $studentId: String
    $date: Float
    $price: Float
    $duration: Float
    $summary: String
    $paid: Boolean
  ) {
    updateLesson(
      lessonId: $lessonId
      studentId: $studentId
      date: $date
      price: $price
      duration: $duration
      summary: $summary
      paid: $paid
    ) {
      studentId
      date
      price
      duration
      summary
      paid
    }
  }
`;
