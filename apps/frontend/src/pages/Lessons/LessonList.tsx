import { MutationTypes, QueryTypes } from '@lessonlog/graphql-types';
import { createMutation } from '@merged/solid-apollo';
import { Component, For } from 'solid-js';
import { lessonQuery, lessonUpdateMutation } from '../../graphql';
import { List, Card, ListItem } from '../../ui';

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
  const [mutateUpdateLesson] = createMutation<QueryTypes.Lesson, MutationTypes.UpdateLesson>(lessonUpdateMutation, {
    refetchQueries: [
      {
        query: lessonQuery,
      }
    ]
  });

  return (
    <Card title="Lessons">
      <List>
        <For
          each={[...props.lessons].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )}
        >
          {(lesson) => (
            <ListItem>
              <div class="flex justify-between">
                <div class="flex flex-col">
                  <p>{lesson.student?.name}</p>
                  <p>{lesson.summary}</p>
                  <p class="text-accent text-xs">
                    {new Date(lesson.date).toUTCString()}
                  </p>
                </div>
                <div class="flex justify-end">
                  <button
                    class={`btn ${lesson.paid ? 'btn-success' : 'btn-error'}`}
                    onClick={() => mutateUpdateLesson({
                      variables: {
                        lessonId: lesson.id,
                        paid: !lesson.paid
                      }
                    })}
                  >
                    Paid?
                  </button>
                </div>
              </div>
            </ListItem>
          )}
        </For>
      </List>
    </Card>
  );
};
