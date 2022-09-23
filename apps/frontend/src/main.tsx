import { ApolloProvider, createQuery } from "@merged/solid-apollo";
import { Component } from "solid-js";
import { render } from "solid-js/web";
import { client, lessonQuery, studentQuery } from "./graphql";
import { QueryTypes } from "@lessonlog/graphql-types";
import { StudentList } from "./pages/Students/StudentList";
import "./index.css";
import { LessonList } from "./pages/Lessons/LessonList";

const App: Component = () => {
  const data = createQuery<{ students: QueryTypes.Student[] }>(studentQuery);
  const lessons = createQuery<{ lessons: QueryTypes.Lesson[] }>(lessonQuery);

  return (
    <div class="flex w-full h-screen">
      <div class="basis-1/3 w-full h-full flex flex-col gap-4">
        <div class="w-full h-full p-4 overflow-auto">
          <StudentList students={data()?.students || []} />
        </div>
        <div class="w-full h-full p-4 overflow-auto">
          <LessonList lessons={lessons()?.lessons || []} />
        </div>
      </div>
      <div class="basis-2/3 w-full"></div>
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
