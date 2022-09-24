import { QueryTypes } from '@lessonlog/graphql-types';
import { Component, For } from 'solid-js';
import { List, Card, ListItem } from '../../ui';
import { LessonListItem } from './LessonListItem';

export interface LessonListProps {
  lessons: Array<QueryTypes.Lesson>;
}

/*
 * Component responsible for rendering a list of lessons
 * on the main page of the application.
 * Note: We have to distructure the lessons array to get a different reference.
 * Because state should be immutable and sort() changes internal state, unlike
 * most other array functions which return a new reference to a new array.
 * This took me forever to work out.
 */
export const LessonList: Component<LessonListProps> = (props) => (
  <Card title="Lessons">
    <List>
      <For
        each={[...props.lessons].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )}
      >
        {(lesson) => (
          <ListItem>
            <LessonListItem lesson={lesson} />
          </ListItem>
        )}
      </For>
    </List>
  </Card>
);
