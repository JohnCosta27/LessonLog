import { ApolloProvider, createQuery } from "@merged/solid-apollo";
import { Component } from "solid-js";
import { render } from "solid-js/web";
import { client, lessonQuery, studentQuery } from "./graphql";
import { QueryTypes } from "@lessonlog/graphql-types";
import { StudentList } from "./pages/Students/StudentList";
import "./index.css";
import { LessonList } from "./pages/Lessons/LessonList";
import { Card } from "./ui";
import { CreateStudent } from "./pages/CreateStudent";
import { CreateStudentLesson } from "./pages/CreateStudentLesson";

const App: Component = () => {
  const data = createQuery<{ students: QueryTypes.Student[] }>(studentQuery);
  const lessons = createQuery<{ lessons: QueryTypes.Lesson[] }>(lessonQuery);

  return (
    <div class="flex w-full h-screen">
      <div class="basis-1/3 w-full h-full flex flex-col">
        <div class="w-full h-full p-4 pr-2 pb-2 overflow-auto">
          <StudentList students={data()?.students || []} />
        </div>
        <div class="w-full h-full p-4 pr-2 pt-2 overflow-auto">
          <LessonList lessons={lessons()?.lessons || []} />
        </div>
      </div>
      <div class="basis-2/3 w-full p-4 pl-2">
        <Card title="Action">
          <CreateStudent />
          <CreateStudentLesson />
        </Card>
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
