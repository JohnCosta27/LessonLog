import { QueryTypes } from "@lessonlog/graphql-types";
import { Component, For } from "solid-js";
import { Card } from "../../ui/Card";
import { Student } from "./Student";

export interface StudentListProps {
  students: Array<QueryTypes.Student>;
}

export const StudentList: Component<StudentListProps> = (props) => {
  return (
    <Card title="Students">
      <div class="w-full h-full flex flex-col gap-4 rounded-md overflow-auto">
        <For each={props.students}>{(student) => <Student {...student} />}</For>
      </div>
    </Card>
  );
};
