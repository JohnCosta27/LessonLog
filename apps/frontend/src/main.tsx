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

interface Student {
  name: string;
  startDate: number;
}
interface StudentData {
  students: Student[];
}

function App() {
  const [name, setName] = createSignal("");
  const [date, setDate] = createSignal(new Date().getTime());

  const data = createQuery<StudentData>(studentQuery);
  const [mutate] = createMutation(studentMutation, {
    refetchQueries: [
      {
        query: studentQuery,
      },
    ],
  });
  return (
    <>
      <input
        type="text"
        placeholder="Type here"
        class="input input-primary w-full max-w-xs"
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <input
        type="date"
        placeholder="Joining date"
        class="input input-primary w-full max-w-xs"
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
          <div class="flex gap-4">
            <p>{student.name}</p>
            <p>{new Date(student.startDate).toISOString().slice(0, 10)}</p>
          </div>
        )}
      </For>
    </>
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
