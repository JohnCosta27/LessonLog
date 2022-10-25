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
        duration
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
      duration
      paid
      summary
      student {
        name
      }
    }
  }
`;
