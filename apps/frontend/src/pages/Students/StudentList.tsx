import { QueryTypes } from '@lessonlog/graphql-types';
import { Component, createSignal, For } from 'solid-js';
import { List, Card, ListItem } from '../../ui';

export interface StudentListProps {
  students: Array<QueryTypes.Student>;
}

/*
 * Component responsible for rendering a list of students
 * on the main page of the application.
 */
export const StudentList: Component<StudentListProps> = (props) => {
  const [search, setSearch] = createSignal('');
  return (
    <Card
      title="Students"
      searchable={true}
      search={search()}
      setSearch={setSearch}
    >
      <List>
        <For each={props.students}>
          {(student) => (
            <ListItem>
              <p>{student.name}</p>
              <p class="text-accent text-xs">
                {new Date(student.startDate).toISOString().slice(0, 10)}
              </p>
            </ListItem>
          )}
        </For>
      </List>
    </Card>
  );
};
