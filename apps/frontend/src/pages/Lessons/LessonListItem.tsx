import { MutationTypes, QueryTypes } from '@lessonlog/graphql-types';
import { createMutation } from '@merged/solid-apollo';
import { Component, createSignal, onCleanup, onMount } from 'solid-js';
import { lessonQuery, lessonUpdateMutation, studentQuery } from '../../graphql';

export interface LessonListItemProps {
  lesson: QueryTypes.Lesson;
}

/*
 * LessonListItem holds some logic, hence why it is seperated,
 * This component is not only responsible for displaying a lesson,
 * but also allowing the user to change it in a convenient and easy way.
 * User can:
 * Change the lesson summary, change the paid state and change the data (TODO).
 */
export const LessonListItem: Component<LessonListItemProps> = (props) => {
  const { lesson } = props;

  const [updateSummary, setUpdateSummary] = createSignal(lesson.summary);

  const [mutateUpdateLesson] = createMutation<
    QueryTypes.Lesson,
    MutationTypes.UpdateLesson
  >(lessonUpdateMutation, {
    refetchQueries: [
      {
        query: lessonQuery,
      },
      {
        query: studentQuery,
      },
    ],
  });

  const updateSummaryMutation = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && updateSummary() !== lesson.summary) {
      e.preventDefault();
      e.stopPropagation();
      mutateUpdateLesson({
        variables: {
          lessonId: lesson.id,
          summary: updateSummary() || undefined,
        },
      });
    }
  };

  onMount(() => {
    window.addEventListener('keydown', updateSummaryMutation);
  });

  onCleanup(() => {
    window.removeEventListener('keydown', updateSummaryMutation);
  });

  return (
    <div class="flex justify-between">
      <div class="flex flex-col gap-1">
        <p>{lesson.student?.name}</p>
        <p
          contentEditable={true}
          onInput={(e) => setUpdateSummary(e.currentTarget.innerText)}
          class={`${
            updateSummary() === lesson.summary
              ? 'focus:outline-success'
              : 'focus:outline-warning'
          } outline-none rounded-sm`}
        >
          {lesson.summary}
        </p>
        <p class="text-accent text-xs">
          {new Date(lesson.date).toLocaleString()}
        </p>
        <p class="text-accent text-xs">
          Duration: {lesson.duration}
        </p>
      </div>
      <div class="flex justify-end">
        <button
          class={`btn ${lesson.paid ? 'btn-success' : 'btn-error'}`}
          onClick={() =>
            mutateUpdateLesson({
              variables: {
                lessonId: lesson.id,
                paid: !lesson.paid,
              },
            })
          }
        >
          {lesson.paid ? 'Paid!' : 'Paid?'}
        </button>
      </div>
    </div>
  );
};
