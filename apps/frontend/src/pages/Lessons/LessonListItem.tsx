import { MutationTypes, QueryTypes } from '@lessonlog/graphql-types';
import { createMutation } from '@merged/solid-apollo';
import { Component, createSignal } from 'solid-js';
import { lessonQuery, lessonUpdateMutation } from '../../graphql';

export interface LessonListItemProps {
  lesson: QueryTypes.Lesson;
}

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
    ],
  });

  const updateSummaryMutation = () => {
    if (updateSummary() !== lesson.summary) {
      mutateUpdateLesson({
        variables: {
          lessonId: lesson.id,
          summary: updateSummary() || undefined,
        },
      });
    }
  };

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      // To stop break in paragraph
      e.preventDefault();
      e.stopPropagation();
      updateSummaryMutation();
    }
  });

  return (
    <div class="flex justify-between">
      <div class="flex flex-col gap-1">
        <p>{lesson.student?.name}</p>
        <p
          contentEditable={true}
          onInput={(e) => setUpdateSummary(e.currentTarget.innerText)}
          class={`focus:${
            updateSummary() === lesson.summary ? 'outline-success' : 'outline-warning'
          } outline-none rounded-sm`}
        >
          {lesson.summary}
        </p>
        <p class="text-accent text-xs">{new Date(lesson.date).toUTCString()}</p>
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
          Paid?
        </button>
      </div>
    </div>
  );
};
