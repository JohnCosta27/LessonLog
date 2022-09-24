import { QueryTypes } from '@lessonlog/graphql-types';
import { Component, createEffect, createSignal, For } from 'solid-js';
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
export const LessonList: Component<LessonListProps> = (props) => {
  const [search, setSearch] = createSignal('');
  const [filteredLessons, setFilteredLessons] = createSignal<
    QueryTypes.Lesson[]
  >(props.lessons);

  createEffect(() => {
    setFilteredLessons(
      [...props.lessons]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .filter((lesson) => {
          const s = search().toLowerCase();
          const date = new Date(lesson.date).toLocaleString();
          return (
            lesson.summary?.toLowerCase().includes(s) ||
            lesson.student?.name.toLowerCase().includes(s) || 
            date.includes(s)
          );
        })
    );
  });

  return (
    <Card
      title="Lessons"
      searchable={true}
      search={search()}
      setSearch={setSearch}
    >
      <List>
        <For each={filteredLessons()}>
          {(lesson) => (
            <ListItem>
              <LessonListItem lesson={lesson} />
            </ListItem>
          )}
        </For>
      </List>
    </Card>
  );
};
