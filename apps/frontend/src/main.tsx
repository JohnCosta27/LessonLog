import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createQuery,
  gql,
  createMutation,
} from "@merged/solid-apollo";
import { createEffect, createSignal, For } from "solid-js";
import { render } from "solid-js/web";
import "./index.css";

const client = new ApolloClient({
  uri: "http://localhost:3001",
  cache: new InMemoryCache(),
});

const studentQuery = gql`
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

const studentMutation = gql`
  mutation addStudent($name: String!, $startDate: Float!) {
    addStudent(name: $name, startDate: $startDate) {
      name
      startDate
    }
  }
`;

const lessonMutation = gql`
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

interface LessonsQuery {
  id: string;
  studentId: string;
  price: number;
  summary?: string;
}

interface StudentsQuery {
  id: string;
  name: string;
  startDate: Date;
  lessons: Array<LessonsQuery>;
}

interface StudentData {
  students: StudentsQuery[];
}

function App() {
  const [name, setName] = createSignal("");
  const [date, setDate] = createSignal(new Date().getTime());

  const [student, setStudent] = createSignal("");
  const [lessonTime, setLessonTime] = createSignal(new Date().getTime());
  const [summary, setSummary] = createSignal("");

  const data = createQuery<StudentData>(studentQuery);

  const [mutate] = createMutation(studentMutation, {
    refetchQueries: [
      {
        query: studentQuery,
      },
    ],
  });
  const [mutateLesson] = createMutation(lessonMutation, {
    refetchQueries: [
      {
        query: studentQuery,
      },
    ],
  });

  return (
    <div class="flex flex-col">
      <div>
        <input
          type="text"
          placeholder="Type here"
          class="input input-secondary w-full max-w-xs"
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <input
          type="date"
          placeholder="Joining date"
          class="input input-secondary w-full max-w-xs"
          onChange={(e) => setDate(new Date(e.currentTarget.value).getTime())}
        />
        <button
          class="btn btn-primary"
          onClick={() => {
            mutate({
              variables: { name: name(), startDate: date() },
            });
          }}
        >
          Create student
        </button>
        <For each={data()?.students}>
          {(student) => (
            <div class="flex gap-4 w-96">
              <div class="w-full">
                <p>{student.name}</p>
              </div>
              <div class="w-full">
                <p>{new Date(student.startDate).toISOString().slice(0, 10)}</p>
              </div>

              <div class="flex flex-col">
                <For each={student.lessons}>
                  {(lesson) => <p>{lesson.id}</p>}
                </For>
              </div>
            </div>
          )}
        </For>
      </div>
      <div>
        <select
          class="select select-secondary w-full max-w-xs"
          onChange={(e) => {
            setStudent(e.currentTarget.value);
          }}
        >
          <option>---</option>
          <For each={data()?.students}>
            {(student) => {
              return <option value={student.id}>{student.name}</option>;
            }}
          </For>
        </select>
        <input
          type="text"
          class="input input-secondary"
          onChange={(e) => setSummary(e.currentTarget.value)}
        />
        <input
          type="date"
          class="input input-secondary"
          onChange={(e) =>
            setLessonTime(new Date(e.currentTarget.value).getTime())
          }
        />
        <button
          class="btn btn-primary"
          onClick={() => {
            console.log(student());
            mutateLesson({
              variables: {
                studentId: student(),
                date: lessonTime(),
                price: 40,
                summary: summary(),
              },
            });
          }}
        >
          Create student
        </button>
      </div>
    </div>
  );
}

function HelloWorld() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

render(() => <HelloWorld />, document.getElementById("root") as HTMLElement);
