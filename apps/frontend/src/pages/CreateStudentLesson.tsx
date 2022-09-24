import { Component, For, createSignal } from 'solid-js';
import { MutationTypes, QueryTypes } from '@lessonlog/graphql-types';
import { createMutation, createQuery } from '@merged/solid-apollo';
import { lessonMutation, lessonQuery, studentQuery } from '../graphql';
import { Temporal } from '@js-temporal/polyfill';

export const CreateStudentLesson: Component = () => {
  const [student, setStudent] = createSignal('');
  const [lessonTime, setLessonTime] = createSignal(new Date().getTime());
  const [summary, setSummary] = createSignal('');

  const data = createQuery<{ students: QueryTypes.Student[] }>(studentQuery);
  const [mutateLesson] = createMutation<
    QueryTypes.Lesson,
    MutationTypes.Lesson
  >(lessonMutation, {
    refetchQueries: [
      {
        query: lessonQuery,
      },
    ],
  });

  return (
    <div class="flex flex-col w-full gap-2">
      <h2 class="text-2xl">Create Lesson</h2>
      <select
        class="select select-secondary w-full"
        onChange={(e) => {
          setStudent(e.currentTarget.value);
        }}
      >
        <option>---</option>
        <For each={data()?.students}>
          {(student) => {
            return <option value={student.id}>{student.name}</option>;
          }}
        </For>
      </select>
      <input
        type="text"
        class="input input-secondary w-full"
        onChange={(e) => setSummary(e.currentTarget.value)}
      />
      <input
        type="datetime-local"
        step={15 * 60}
        value={`${Temporal.Now.plainDateISO()}T16:00`}
        class="input input-secondary w-full"
        onChange={(e) =>
          setLessonTime(new Date(e.currentTarget.value).getTime())
        }
      />
      <button
        class="btn btn-primary"
        onClick={() => {
          mutateLesson({
            variables: {
              studentId: student(),
              date: lessonTime(),
              price: 40,
              summary: summary(),
            },
          });
        }}
      >
        Create Lesson
      </button>
    </div>
  );
};
