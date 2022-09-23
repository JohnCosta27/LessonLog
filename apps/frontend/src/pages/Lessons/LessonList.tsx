import { QueryTypes } from "@lessonlog/graphql-types";
import { Component, For } from "solid-js";
import { List, Card, ListItem } from "../../ui";

export interface LessonListProps {
  lessons: Array<QueryTypes.Lesson>;
}

/*
 * Component responsible for rendering a list of lessons
 * on the main page of the application.
 */
export const LessonList: Component<LessonListProps> = (props) => (
  <Card title="Lessons">
    <List>
      <For each={props.lessons}>
        {(lesson) => (
          <ListItem>
            <p>{lesson.student?.name}</p>
            <p class="text-accent text-xs">
              {new Date(lesson.date).toISOString().slice(0, 10)}
            </p>
          </ListItem>
        )}
      </For>
    </List>
  </Card>
);
