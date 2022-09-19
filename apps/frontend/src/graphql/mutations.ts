import { gql } from "@merged/solid-apollo";

export const studentMutation = gql`
  mutation addStudent($name: String!, $startDate: Float!) {
    addStudent(name: $name, startDate: $startDate) {
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
    $summary: String
  ) {
    addLesson(
      studentId: $studentId
      date: $date
      price: $price
      summary: $summary
    ) {
      id
      studentId
      date
      price
      summary
    }
  }
`;