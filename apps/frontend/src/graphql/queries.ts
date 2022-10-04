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
        paid
        summary
      }
      hourBanks {
        id
        studentId
        date
        hours
        hoursLeft
      }
      studentPrices {
        id
        studentId
        date
        price
      }
    }
  }
`;

export const lessonQuery = gql`
  query Lessons {
    lessons {
      id
      studentId
      date
      price
      paid
      summary
      student {
        name
      }
    }
  }
`;
