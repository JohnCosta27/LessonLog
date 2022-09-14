import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createQuery,
  gql,
} from "@merged/solid-apollo";
import { createEffect, createSignal, For } from "solid-js";
import { render } from "solid-js/web";

const client = new ApolloClient({
  uri: "http://localhost:3000",
  cache: new InMemoryCache(),
});

const studentQuery = gql`
  query Students {
    students {
      name
    }
  }
`;

interface Student {
  name: string;
}
interface StudentData {
  students: Student[];
}

function App() {
  const data = createQuery<StudentData>(studentQuery);
  createEffect(() => {
    console.log(data()?.students);
  });
  return (
    <For each={data()?.students}>
      {(student) => <p>{student.name}</p>}
    </For>
  );
}

function HelloWorld() {
  const [count, setCount] = createSignal(0);

  return (
    <ApolloProvider client={client}>
      <div>Hello World!</div>
      <p>{count()}</p>
      <button onClick={() => setCount(count() + 1)}>Click me</button>
      <App />
    </ApolloProvider>
  );
}

render(() => <HelloWorld />, document.getElementById("root") as HTMLElement);
