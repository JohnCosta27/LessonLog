import { Component, For, createSignal } from 'solid-js';
import { QueryTypes, MutationTypes } from '@lessonlog/graphql-types';
import { Temporal } from '@js-temporal/polyfill';
import { createMutation } from '@merged/solid-apollo';
import { hourBankMutation, studentQuery } from '../graphql';

export interface CreateHourBankProps {
  students: QueryTypes.Student[];
}

export const CreateHourBank: Component<CreateHourBankProps> = (props) => {
  const [student, setStudent] = createSignal('');
  const [date, setDate] = createSignal(new Date().getTime());
  const [hours, setHours] = createSignal(10);

  const [mutateHourBank] = createMutation<
    QueryTypes.HourBank,
    MutationTypes.HourBank
  >(hourBankMutation, {
    refetchQueries: [
      {
        query: studentQuery,
      },
    ],
  });

  return (
    <div class="w-full flex flex-col gap-2">
      <h2 class="text-2xl">Create Hour Bank</h2>
      <select
        class="select select-secondary w-full"
        onChange={(e) => {
          setStudent(e.currentTarget.value);
        }}
      >
        <option>---</option>
        <For each={props.students}>
          {(student) => {
            return <option value={student.id}>{student.name}</option>;
          }}
        </For>
      </select>
      <input
        type="number"
        value={hours()}
        placeholder="Hours"
        class="input input-secondary w-full"
        onChange={(e) => setHours(parseFloat(e.currentTarget.value))}
      />
      <input
        type="date"
        value={Temporal.Now.plainDateISO().toString()}
        placeholder="Date"
        class="input input-secondary w-full"
        onChange={(e) => setDate(new Date(e.currentTarget.value).getTime())}
      />
      <button
        class="btn btn-primary w-full"
        onClick={() =>
          mutateHourBank({
            variables: {
              studentId: student(),
              hours: hours(),
              date: date(),
            },
          })
        }
      >
        Create Student
      </button>
    </div>
  );
};
