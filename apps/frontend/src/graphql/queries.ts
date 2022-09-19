import { gql } from "@merged/solid-apollo";

export const studentQuery = gql`
  query Students {
    students {
      name
      startDate
      id
      lessons {
        id
        studentId
        price
        summary
      }
    }
  }
`;
