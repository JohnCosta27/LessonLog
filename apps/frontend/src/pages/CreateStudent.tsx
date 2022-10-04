import { Component, createSignal } from 'solid-js';
import { createMutation } from '@merged/solid-apollo';
import { studentMutation, studentQuery } from '../graphql';
import { MutationTypes, QueryTypes } from '@lessonlog/graphql-types';
import { Temporal } from '@js-temporal/polyfill';

export const CreateStudent: Component = () => {
  const [name, setName] = createSignal('');
  const [date, setDate] = createSignal(new Date().getTime());
  const [price, setPrice] = createSignal(40);

  const [mutate] = createMutation<QueryTypes.Student, MutationTypes.Student>(
    studentMutation,
    {
      refetchQueries: [
        {
          query: studentQuery,
        },
      ],
    }
  );

  return (
    <div class="w-full flex flex-col gap-2">
      <h2 class="text-2xl">Create Student</h2>
      <input
        type="text"
        placeholder="Student name..."
        class="input input-secondary w-full"
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <input
        type="date"
        value={Temporal.Now.plainDateISO().toString()}
        placeholder="Joining date"
        class="input input-secondary w-full"
        onChange={(e) => setDate(new Date(e.currentTarget.value).getTime())}
      />
      <input
        type="number"
        value={price()}
        placeholder="Lesson price"
        class="input input-secondary w-full pl-4"
        onChange={(e) => setPrice(parseFloat(e.currentTarget.value))}
      />
      <button
        class="btn btn-primary w-full"
        onClick={() => {
          mutate({
            variables: { name: name(), startDate: date(), price: price() },
          });
        }}
      >
        Create Student
      </button>
    </div>
  );
};
