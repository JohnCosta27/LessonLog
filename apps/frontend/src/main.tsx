import {
  ApolloProvider,
  createQuery,
} from "@merged/solid-apollo";
import { Component, For } from "solid-js";
import { render } from "solid-js/web";
import { client, studentQuery } from "./graphql";
import { QueryTypes } from "@lessonlog/graphql-types";
import "./index.css";
import { CreateStudent } from "./pages/CreateStudent";
import { CreateStudentLesson } from "./pages/CreateStudentLesson";

const App: Component = () => {
  const data = createQuery<{ students: QueryTypes.Student[] }>(studentQuery);

  return (
    <div class="flex flex-col w-screen">
      <CreateStudent />
      <CreateStudentLesson />
      <div class="w-full">
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
    </div>
  );
};

function HelloWorld() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

render(() => <HelloWorld />, document.getElementById("root") as HTMLElement);
