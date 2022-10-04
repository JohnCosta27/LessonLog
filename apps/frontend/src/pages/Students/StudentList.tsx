import { QueryTypes } from '@lessonlog/graphql-types';
import { Component, createSignal, For } from 'solid-js';
import { List, Card, ListItem } from '../../ui';
import { StudentListItem } from './StudentListItem';

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
              <StudentListItem
                name={student.name}
                startDate={new Date(student.startDate)}
                lessons={student.lessons}
                hourBanks={student.hourBanks}
                studentPrices={student.studentPrices}
              />
            </ListItem>
          )}
        </For>
      </List>
    </Card>
  );
};
